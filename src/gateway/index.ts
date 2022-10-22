import { RawData, WebSocket } from 'ws';
import { intentCalculator, Opcode } from '../discord';
import Client, { Options } from '../Client';
import Events from './handler';
import HTTPS from '../HTTPS';

const URI = 'wss://gateway.discord.gg/?v=9&encoding=json';

interface Payload {
  op: Opcode;
  d: Record<string, unknown>;
  // s?: number;
  // t?: string;
}

interface Payload {
  s: number;
  t: string;
}

export default class Gateway {
  private options: Options;
  private sequenceNum: number;
  private heartbeat?: NodeJS.Timer;
  sessionId?: string;
  client: Client;
  request: HTTPS;
  connected: boolean;
  reconnecting: boolean;
  expectedGuilds: string[] = [];
  resumeGatewayUrl?: string;
  gateway: WebSocket;

  constructor(options: Options, client: Client, request: HTTPS) {
    this.options = options;
    this.client = client;
    this.request = request;
    this.connected = false;
    this.reconnecting = false;
    this.gateway = new WebSocket(URI, { handshakeTimeout: 30000 });
    this.sequenceNum = 0;

    this.gateway.on('message', this.onMessage.bind(this));
  }

  close(code?: number) {
    this.gateway.close(code);
  }

  reconnect() {
    this.close(1000);
    clearInterval(this.heartbeat);
    setTimeout(() => {
      this.connected = false;
      this.reconnecting = true;
      this.gateway = new WebSocket(this.resumeGatewayUrl || URI, {
        handshakeTimeout: 30000,
      });
      this.gateway.on('message', this.onMessage.bind(this));
    }, 2000);
  }

  send(data: { op: number; d: unknown }) {
    this.gateway.send(JSON.stringify(data));
  }

  private onMessage(rawData: RawData) {
    const data: Payload = JSON.parse(rawData.toString());
    switch (data.op) {
      case Opcode.HELLO: {
        this.send({
          op: Opcode.IDENTIFY,
          d: {
            token: this.options.token,
            intents: intentCalculator(this.options.intents),
            properties: {
              $os: 'linux',
              $browser: 'periljs',
              $device: 'perils',
            },
          },
        });

        this.heartbeat = setInterval(
          () => this.send({ op: 1, d: this.sequenceNum }),
          data.d.heartbeat_interval as number
        );
        break;
      }

      case Opcode.DISPATCH: {
        this.sequenceNum = data.s;
        if (Events[data.t]) Events[data.t](data.d, this);
        else console.log(data);
        break;
      }

      case Opcode.RECONNECT: {
        this.reconnect();
        break;
      }
    }
  }
}
