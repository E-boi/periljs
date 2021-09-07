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
import { createChannelClass } from './util/channel';

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
									const channel = createChannelClass(c, this.bot.HTTP);
									if (!channel) return;
									this.bot.channels.set(channel.id.toString(), channel);
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

						case 'CHANNEL_CREATE':
							const createdChannel = createChannelClass(data.d, this.bot.HTTP);
							if (!createdChannel) return;
							this.bot.channels.set(createdChannel.id.toString(), createdChannel);
							this.bot.emit('channel.create', createdChannel);
							break;
						case 'CHANNEL_UPDATE':
							const channel = this.bot.channels.get(data.d.id);
							const updatedChannel = createChannelClass(data.d, this.bot.HTTP);
							if (!updatedChannel) return;
							this.bot.emit('channel.update', channel, updatedChannel);
							this.bot.channels.set(updatedChannel.id.toString(), updatedChannel);
							break;
						case 'CHANNEL_DELETE':
							const deletedChannel = createChannelClass(data.d, this.bot.HTTP);
							if (!deletedChannel) return;
							this.bot.channels.delete(deletedChannel.id.toString());
							this.bot.emit('channel.delete', deletedChannel);
							break;

						case 'THREAD_CREATE':
							const threadCreated = createChannelClass(data.d, this.bot.HTTP);
							if (!threadCreated) return;
							this.bot.channels.set(threadCreated.id.toString(), threadCreated);
							this.bot.emit('thread.create', threadCreated);
							break;
						case 'THREAD_UPDATE':
							const threadUpdated = createChannelClass(data.d, this.bot.HTTP);
							const beforeThreadUpdated = this.bot.channels.get(data.d.id);
							if (!threadUpdated) return;
							this.bot.channels.set(threadUpdated.id.toString(), threadUpdated);
							this.bot.emit('thread.update', beforeThreadUpdated, threadUpdated);
							break;
						case 'THREAD_DELETE':
							const threadDeleted = this.bot.channels.get(data.d.id);
							this.bot.emit('thread.delete', threadDeleted);
							this.bot.channels.delete(data.d.id);
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
