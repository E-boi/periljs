import WebSocket, { RawData } from 'ws';
import { intentCalculator, Opcode } from '../discord';
import Client, { Options } from '../Client';
import Events from './handler';
import HTTPS from '../HTTPS';

const GatewayURL = 'wss://gateway.discord.gg/?v=10&encoding=json';

interface Payload {
  op: Opcode;
  d: Record<string, unknown>;
}

interface Payload {
  s: number;
  t: string;
}

export default class Gateway {
  private options: Options;
  private sequenceNum: number;
  private heartbeatInterval?: NodeJS.Timer;
  sessionId?: string;
  client: Client;
  request: HTTPS;
  status?: 'connected' | 'connecting' | 'reconnecting';
  expectedGuilds: string[] = [];
  resumeGatewayUrl?: string;
  gateway?: WebSocket;

  constructor(options: Options, client: Client, request: HTTPS) {
    this.options = options;
    this.client = client;
    this.request = request;
    this.sequenceNum = 0;
    this.onMessage = this.onMessage.bind(this);
    this.onClose = this.onClose.bind(this);
    this.heartbeat = this.heartbeat.bind(this);
  }

  connect() {
    this.status = 'connecting';
    this.gateway = new WebSocket(GatewayURL, { handshakeTimeout: 30000 });
    this.gateway.on('message', this.onMessage);
    this.gateway.on('close', this.onClose);
  }

  close(code?: number, reconnecting = false) {
    this.gateway?.close(code);
    this.gateway?.removeAllListeners();
    delete this.gateway;
    if (!reconnecting) {
      delete this.sessionId;
      delete this.resumeGatewayUrl;
    }
  }

  reconnect() {
    this.close(4392, true);
    clearInterval(this.heartbeatInterval);
    this.heartbeatInterval = undefined;
    this.status = 'reconnecting';
    this.gateway = new WebSocket(this.resumeGatewayUrl || GatewayURL, {
      handshakeTimeout: 30000,
    });
    this.gateway.on('message', this.onMessage);
    this.gateway.on('close', this.onClose);
  }

  send(data: { op: number; d: unknown }) {
    this.gateway?.send(JSON.stringify(data));
  }

  heartbeat() {
    if (this.status === 'reconnecting') return;
    this.send({ op: Opcode.HEARTBEAT, d: this.sequenceNum });
  }

  private onMessage(rawData: RawData) {
    const data: Payload = JSON.parse(rawData.toString());
    switch (data.op) {
      case Opcode.HELLO: {
        if (!this.sessionId) {
          this.send({
            op: Opcode.IDENTIFY,
            d: {
              token: this.options.token,
              intents: intentCalculator(this.options.intents),
              properties: {
                os: 'linux',
                browser: 'periljs',
                device: 'perils',
              },
            },
          });
          this.heartbeat();
        } else
          this.send({
            op: Opcode.RESUME,
            d: {
              token: this.options.token,
              session_id: this.sessionId,
              seq: this.sequenceNum,
            },
          });

        this.heartbeatInterval = setInterval(
          this.heartbeat,
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

      case Opcode.INVALID_SESSION: {
        this.sequenceNum = 0;
        this.sessionId = undefined;
        this.send({
          op: Opcode.IDENTIFY,
          d: {
            token: this.options.token,
            intents: intentCalculator(this.options.intents),
            properties: {
              os: 'linux',
              browser: 'periljs',
              device: 'perils',
            },
          },
        });
        break;
      }

      case Opcode.HEARTBEAT: {
        this.heartbeat();
        break;
      }

      case Opcode.RECONNECT: {
        this.reconnect();
        break;
      }
    }
  }

  onClose(code: number, reason: Buffer) {
    console.log(`code: ${code}, reason: ${reason.toString()}`);
    this.reconnect();
  }
}
