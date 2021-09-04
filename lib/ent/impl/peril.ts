import WebSocket from 'ws';
import { WS_URI } from '../../constants';
import { IClientOptions } from '../intf/IClientOptions';
import IMessage from '../intf/IMessage';
import Client from './client';
import intentCalculator from './intents';
import ButtonInteraction from './interactions/ButtonInteraction';
import MessageInteraction from './interactions/MessageInteraction';
import SelectMenuInteraction from './interactions/SelectMenuInteraction';
import SlashInteraction from './interactions/SlashInteraction';
import UserInteraction from './interactions/UserInteraction';

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
							this.bot.guilds.set(data.d.id, data.d);
							this.bot.emit('guild.create', data.d);
							break;
						case 'GUILD_DELETE':
							const guild = this.bot.guilds.get(data.d.id);
							if (!data.d.unavailible) this.bot.guilds.delete(data.d.id);
							this.bot.emit('guild.delete', guild);
							break;
						case 'MESSAGE_CREATE':
							const message: IMessage = data.d;
							if (message.author.id === this.bot.bot?.id) return;
							this.bot.emit('message.create', message);
							break;
						case 'MESSAGE_UPDATE':
							const updatedMessage: IMessage = data.d;
							this.bot.emit('message.update', updatedMessage);
							break;
						case 'MESSAGE_DELETE':
							const deletedMessages: IMessage = data.d;
							this.bot.emit('message.delete', deletedMessages);
							break;
						case 'INTERACTION_CREATE':
							if (data.d.type === 2) {
								if (data.d.data.type === 1) this.bot.emit('interaction.slash', new SlashInteraction(this.bot, data.d));
								else if (data.d.data.type === 2) this.bot.emit('interaction.user', new UserInteraction(this.bot, data.d));
								else if (data.d.data.type === 3) this.bot.emit('interaction.message', new MessageInteraction(this.bot, data.d));
							} else if (data.d.type === 3) {
								if (data.d.data.component_type === 2) this.bot.emit('interaction.button', new ButtonInteraction(this.bot, data.d));
								if (data.d.data.component_type === 3) this.bot.emit('interaction.selectMenu', new SelectMenuInteraction(this.bot, data.d));
							}
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
