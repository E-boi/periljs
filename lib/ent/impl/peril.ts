import WebSocket from 'ws';
import { WS_URI } from '../../constants';
import { IClientOptions } from '../intf/IClientOptions';
import IMessage from '../intf/IMessage';
import Category from './channels/Category';
import DMChannel from './channels/DMChannel';
import TextChannel from './channels/TextChannel';
import VoiceChannel from './channels/VoiceChannel';
import Client from './client';
import Guild from './guild/Guild';
import intentCalculator from './intents';
import ButtonInteraction from './interactions/ButtonInteraction';
import MessageInteraction from './interactions/MessageInteraction';
import SelectMenuInteraction from './interactions/SelectMenuInteraction';
import SlashInteraction from './interactions/SlashInteraction';
import UserInteraction from './interactions/UserInteraction';
import Message from './Message';

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
							const createdGuild: Guild = new Guild(data.d, this.bot.HTTP);
							this.bot.guilds.set(createdGuild.id.toString(), createdGuild);
							createdGuild.channels.forEach(channel => this.bot.channels.set(channel.id.toString(), channel));
							if (this.bot.getAllMembers) this.send(JSON.stringify({ op: 8, d: { guild_id: [data.d.id], query: '', limit: 0 } }));
							this.bot.emit('guild.create', createdGuild);
							break;
						case 'GUILD_DELETE':
							const guild = this.bot.guilds.get(data.d.id);
							if (!data.d.unavailible) this.bot.guilds.delete(data.d.id);
							this.bot.emit('guild.delete', guild);
							break;
						case 'MESSAGE_CREATE':
							if (!this.bot.channels.has(data.d.channel_id)) {
								this.bot.HTTP.getChannel(data.d.channel_id).then(c => {
									if (!c) return;
									if (c.type === 0) this.bot.channels.set(c.id.toString(), new TextChannel(c as any, this.bot.HTTP));
									else if (c.type === 1) this.bot.channels.set(c.id.toString(), new DMChannel(c as any, this.bot.HTTP));
									else if (c.type === 2) this.bot.channels.set(c.id.toString(), new VoiceChannel(c as any));
									else if (c.type === 4) this.bot.channels.set(c.id.toString(), new Category(c as any));
									else return;
									if (data.d.author.id === this.bot.bot?.id) return;
									const message: Message = new Message(data.d, this.bot);
									this.bot.emit('message.create', message);
								});
							} else {
								if (data.d.author.id === this.bot.bot?.id) return;
								const message: Message = new Message(data.d, this.bot);
								this.bot.emit('message.create', message);
							}
							break;
						case 'MESSAGE_UPDATE':
							const updatedMessage: Message = new Message(data.d, this.bot);
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
