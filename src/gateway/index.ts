import { RawData, WebSocket } from 'ws';
import { intentCalculator, Opcode } from '../discord';
import Client, { Options } from '../Client';
import Events from './handler';
import HTTPS from '../HTTPS';

const URI = 'wss://gateway.discord.gg/?v=9&encoding=json';

interface Payload {
  op: Opcode;
  d: Record<string, unknown>;
  s?: number;
  // t?: string;
}

interface Payload {
  t: string;
}

export default class Gateway extends WebSocket {
  private options: Options;
  sessionId?: string;
  client: Client;
  request: HTTPS;
  connected: boolean;
  expectedGuilds: string[] = [];

  constructor(options: Options, client: Client, request: HTTPS) {
    super(URI);
    this.options = options;
    this.client = client;
    this.request = request;
    this.connected = false;

    this.on('message', this.onMessage);
  }

  onMessage(rawData: RawData) {
    const data: Payload = JSON.parse(rawData.toString());

    switch (data.op) {
      case Opcode.HELLO: {
        this.send(
          JSON.stringify({
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
          })
        );

        setInterval(
          () => this.send(JSON.stringify({ op: 1, d: 0 })),
          data.d.heartbeat_interval as number
        );
        break;
      }

      case 0: {
        if (Events[data.t])
          Events[data.t](
            data.d,
            this,
            data.t.toLowerCase().replaceAll('_', '.')
          );
        else console.log(data);
        break;
        // const name = data.t.toLowerCase().replace('_', '.');
        // this.client.emit(name, data.d);
      }
    }
  }
}
