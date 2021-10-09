import WebSocket from 'ws';
import { WS_URI } from '../../../constants';
import { IClientOptions } from '../../intf/IClientOptions';
import Client from '../client';
import intentCalculator from '../intents';
import CHANNEL_CREATE from './events/channel/CHANNEL_CREATE';
import CHANNEL_DELETE from './events/channel/CHANNEL_DELETE';
import CHANNEL_UPDATE from './events/channel/CHANNEL_UPDATE';
import GUILD_BAN_ADD from './events/guild/GUILD_BAN_ADD';
import GUILD_BAN_REMOVE from './events/guild/GUILD_BAN_REMOVE';
import GUILD_CREATE from './events/guild/GUILD_CREATE';
import GUILD_DELETE from './events/guild/GUILD_DELETE';
import GUILD_MEMBERS_CHUNK from './events/guild/GUILD_MEMBERS_CHUNK';
import GUILD_MEMBER_ADD from './events/guild/GUILD_MEMBER_ADD';
import GUILD_MEMBER_REMOVE from './events/guild/GUILD_MEMBER_REMOVE';
import GUILD_MEMBER_UPDATE from './events/guild/GUILD_MEMBER_UPDATE';
import GUILD_ROLE_CREATE from './events/guild/GUILD_ROLE_CREATE';
import GUILD_ROLE_DELETE from './events/guild/GUILD_ROLE_DELETE';
import GUILD_ROLE_UPDATE from './events/guild/GUILD_ROLE_UPDATE';
import INTERACTION_CREATE from './events/INTERACTION_CREATE';
import INVITE_CREATE from './events/INVITE_CREATE';
import INVITE_DELETE from './events/INVITE_DELETE';
import MESSAGE_CREATE from './events/message/MESSAGE_CREATE';
import MESSAGE_DELETE from './events/message/MESSAGE_DELETE_BULK';
import MESSAGE_DELETE_BULK from './events/message/MESSAGE_DELETE_BULK';
import MESSAGE_REACTION_ADD from './events/message/MESSAGE_REACTION_ADD';
import MESSAGE_UPDATE from './events/message/MESSAGE_UPDATE';
import THREAD_CREATE from './events/thread/THREAD_CREATE';
import THREAD_DELETE from './events/thread/THREAD_DELETE';
import THREAD_UPDATE from './events/thread/THREAD_UPDATE';

export default class Peril extends WebSocket {
	options: IClientOptions;
	readonly bot: Client;

	constructor(options: IClientOptions, bot: Client) {
		super(options.discordWebsocket || WS_URI);
		this.options = options;
		this.bot = bot;
		this.on('message', d => {
			const data = JSON.parse(d.toString());
			switch (data.op) {
				case 0:
					switch (data.t) {
						case 'READY':
							this.bot.bot = data.d.user;
							this.bot.emit('ready', this.bot.bot);
							break;
						case 'GUILD_CREATE':
							GUILD_CREATE(this, data.d);
							break;
						case 'GUILD_DELETE':
							GUILD_DELETE(this, data.d);
							break;
						case 'GUILD_BAN_ADD':
							GUILD_BAN_ADD(this, data.d);
							break;
						case 'GUILD_BAN_REMOVE':
							GUILD_BAN_REMOVE(this, data.d);
							break;
						case 'GUILD_MEMBER_ADD':
							GUILD_MEMBER_ADD(this, data.d);
							break;
						case 'GUILD_MEMBER_REMOVE':
							GUILD_MEMBER_REMOVE(this, data.d);
							break;
						case 'GUILD_MEMBER_UPDATE':
							GUILD_MEMBER_UPDATE(this, data.d);
							break;
						case 'GUILD_MEMBERS_CHUNK':
							GUILD_MEMBERS_CHUNK(this, data.d);
							break;
						case 'GUILD_ROLE_CREATE':
							GUILD_ROLE_CREATE(this, data.d);
							break;
						case 'GUILD_ROLE_UPDATE':
							GUILD_ROLE_UPDATE(this, data.d);
							break;
						case 'GUILD_ROLE_DELETE':
							GUILD_ROLE_DELETE(this, data.d);
							break;

						case 'INVITE_CREATE':
							INVITE_CREATE(this, data.d);
							break;
						case 'INVITE_DELETE':
							INVITE_DELETE(this, data.d);
							break;

						case 'MESSAGE_CREATE':
							MESSAGE_CREATE(this, data.d);
							break;
						case 'MESSAGE_UPDATE':
							MESSAGE_UPDATE(this, data.d);
							break;
						case 'MESSAGE_DELETE':
							MESSAGE_DELETE(this, data.d);
							break;
						case 'MESSAGE_DELETE_BULK':
							MESSAGE_DELETE_BULK(this, data.d);
							break;
						case 'MESSAGE_REACTION_ADD':
							MESSAGE_REACTION_ADD(this, data.d);
							break;

						case 'INTERACTION_CREATE':
							INTERACTION_CREATE(this, data.d);
							break;

						case 'CHANNEL_CREATE':
							CHANNEL_CREATE(this, data.d);
							break;
						case 'CHANNEL_UPDATE':
							CHANNEL_UPDATE(this, data.d);
							break;
						case 'CHANNEL_DELETE':
							CHANNEL_DELETE(this, data.d);
							break;

						case 'THREAD_CREATE':
							THREAD_CREATE(this, data.d);
							break;
						case 'THREAD_UPDATE':
							THREAD_UPDATE(this, data.d);
							break;
						case 'THREAD_DELETE':
							THREAD_DELETE(this, data.d);
							break;
						default:
							console.log(data);
					}
					break;
				case 10:
					this.send(
						JSON.stringify({
							op: 2,
							d: {
								token: this.options.clientAuthentication.token,
								intents: intentCalculator(this.options.intents),
								properties: { $os: process.platform, $browser: 'Peril', $device: 'periljs' },
							},
						})
					);
					const heartbeat = data.d.heartbeat_interval;
					setInterval(() => this.send(JSON.stringify({ op: 1, d: 0 })), heartbeat);
					break;
			}
		});
	}
}
