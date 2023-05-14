import WebSocket from "ws";
import { Client, ClientOptions } from "../client";
import Logger from "../logger";
import Events from "./events";
import { Intents, intentCalculator } from "./intents";
import { Opcodes } from "./opcode";

export interface Payload {
  op: Opcodes;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  d?: any;
  s?: number;
  t?: string;
}

export class Gateway {
  // eslint-disable-next-line no-undef
  private heartbeatInterval?: NodeJS.Timer;
  private websocket?: WebSocket;
  private sequence?: number;
  private token: string;
  private intents: Intents[];
  private websocketUrl?: string;
  client: Client;
  logger = new Logger("Gateway");
  status: "idle" | "connected" | "connecting" | "reconnecting" | "disconnected";
  sessionId?: string;
  resumeUrl?: string;
  retries = 0;
  expectedGuilds?: string[];

  constructor(client: Client, clientOptions: ClientOptions) {
    this.token = clientOptions.token;
    this.intents = clientOptions.intents;
    this.status = "idle";
    this.client = client;

    this.onMessage = this.onMessage.bind(this);
  }

  async init() {
    this.status = "connecting";
    const gatewayBot = await this.client.rest.getGateway();

    this.websocketUrl = `${gatewayBot.url}/?v=10&encoding=json`;

    this.websocket = new WebSocket(this.websocketUrl);

    this.websocket.on("open", () => {
      this.logger.debug("Connected to gateway");
    });

    this.websocket.on("message", this.onMessage);
    this.websocket.on("close", (code, reason) => {
      clearInterval(this.heartbeatInterval);
      this.logger.error(`Closing, code: ${code}, reason: ${reason.toString}`);
    });
  }

  close() {
    this.websocket?.removeAllListeners();
    this.websocket?.close(4901, "Reconnecting");
    this.logger.debug("Closing");
    clearInterval(this.heartbeatInterval);
  }

  reconnect(resume?: boolean) {
    this.logger.debug("Attempting to reconnect, resume: ", resume);

    this.close();
    if (resume) this.status = "reconnecting";
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.websocket = new WebSocket(this.resumeUrl ?? this.websocketUrl!);
    this.websocket.on("open", () => {
      this.logger.debug("Connected to gateway");
    });

    this.websocket.on("message", this.onMessage);
    this.websocket.on("close", (code, reason) => {
      clearInterval(this.heartbeatInterval);
      this.logger.error(`Closing, code: ${code}, reason: ${reason.toString}`);
    });
  }

  send(payload: Payload) {
    this.websocket?.send(JSON.stringify(payload));
    this.logger.log("Sent", payload);
  }

  private onMessage(message: WebSocket.RawData) {
    const data: Payload = JSON.parse(message.toString());

    switch (data.op) {
      case Opcodes.hello: {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.startBeating(data.d!.heartbeat_interval);

        if (this.status === "reconnecting") {
          this.logger.debug("Resuming...");
          this.send({
            op: Opcodes.resume,
            d: {
              token: this.token,
              session_id: this.sessionId,
              seq: this.sequence,
            },
          });
        } else this.identify();

        break;
      }

      case Opcodes.heartbeat: {
        this.send({ op: Opcodes.heartbeat, d: this.sequence });
        break;
      }

      case Opcodes.heartbeatACK: {
        this.logger.debug("Heartbeat acknowledged");
        break;
      }

      case Opcodes.invalidSession: {
        if (data.d === true) this.reconnect(true);
        else {
          delete this.sessionId;
          delete this.resumeUrl;
          this.sequence = 0;
          this.status = "disconnected";
          if (this.retries < 5) {
            this.reconnect();
            this.retries++;
          } else {
            this.close();
            throw Error("Could not connect to gateway");
          }
        }
        break;
      }

      case Opcodes.reconnect: {
        this.reconnect(true);
        break;
      }

      case Opcodes.dispatch: {
        this.sequence = data.s;

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if (Events[data.t!]) Events[data.t!](data.d, this);
        else this.logger.error("Unknown Event:", data);
        break;
      }
    }
  }

  private identify() {
    const identifier = {
      token: this.token,
      intents: intentCalculator(this.intents),
      properties: {
        os: "linux",
        browser: "peril",
        device: "perils",
      },
    };

    this.send({ op: Opcodes.identify, d: identifier });
  }

  private startBeating(interval: number) {
    this.heartbeatInterval = setInterval(() => {
      this.send({ op: Opcodes.heartbeat, d: this.sequence });
    }, interval);
  }
}
