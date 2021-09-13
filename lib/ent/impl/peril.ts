import WebSocket from 'ws';
import { GuildMember } from '../../..';
import { WS_URI } from '../../constants';
import { Snowflake } from '../const/Snowflake';
import IGuildMember from '../intf/guild/IGuildMember';
import { DeletedMessage, DeletedMessages } from '../intf/IClientEvents';
import { IClientOptions } from '../intf/IClientOptions';
import IMessage from '../intf/IMessage';
import Client from './client';
import Guild from './guild/Guild';
import Role from './guild/Role';
import intentCalculator from './intents';
import { ButtonInteraction, MessageInteraction, SelectMenuInteraction, SlashInteraction, UserInteraction } from './interactions';
import Invite, { DeletedInvite } from './Invite';
import Message from './Message';
import User from './User';
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
						case 'GUILD_BAN_ADD':
							const bannedFrom = this.bot.guilds.get(data.d.guild_id);
							const bannedMember = new User(data.d.user);
							this.bot.emit('guild.ban.add', bannedMember, bannedFrom);
							break;
						case 'GUILD_BAN_REMOVE':
							const unbannedFrom = this.bot.guilds.get(data.d.guild_id);
							const unbannedMember = new User(data.d.user);
							this.bot.emit('guild.ban.remove', unbannedMember, unbannedFrom);
							break;
						case 'GUILD_MEMBER_ADD':
							const addedMember = new GuildMember(data.d);
							const guildJoined = this.bot.guilds.get(data.d.guild_id);
							guildJoined?.members.set(addedMember.user.id, addedMember);
							this.bot.emit('guild.member.join', addedMember, guildJoined);
							break;
						case 'GUILD_MEMBER_REMOVE':
							const leftedMember = new User(data.d.user);
							const guildLefted = this.bot.guilds.get(data.d.guild_id);
							guildLefted?.members.delete(leftedMember.id);
							this.bot.emit('guild.member.leave', leftedMember, guildLefted);
							break;
						case 'GUILD_MEMBER_UPDATE':
							const updatedFrom = this.bot.guilds.get(data.d.guild_id);
							const memberBefore = updatedFrom?.members.get(data.d.user.id);
							const memberNow = new GuildMember(data.d);
							this.bot.emit('guild.member.update', memberBefore, memberNow, updatedFrom);
							updatedFrom?.members.set(memberNow.user.id, memberNow);
							break;
						case 'GUILD_MEMBERS_CHUNK':
							const updateMembersFrom = this.bot.guilds.get(data.d.guild_id);
							data.d.members.map((member: IGuildMember) => updateMembersFrom?.members.set(member.user.id, new GuildMember(member)));
							break;
						case 'GUILD_ROLE_CREATE':
							const createdRole = new Role(data.d.role);
							const createdAt = this.bot.guilds.get(data.d.guild_id);
							this.bot.emit('guild.role.create', createdRole, createdAt);
							createdAt?.roles.set(createdRole.id.toString(), createdRole);
							break;
						case 'GUILD_ROLE_UPDATE':
							const updatedAt = this.bot.guilds.get(data.d.guild_id);
							const updatedRole = new Role(data.d.role);
							const beforeRole = updatedAt?.roles.get(data.d.role.id);
							this.bot.emit('guild.role.update', beforeRole, updatedRole, updatedAt);
							updatedAt?.roles.set(updatedRole.id.toString(), updatedRole);
							break;
						case 'GUILD_ROLE_DELETE':
							const deletedAt = this.bot.guilds.get(data.d.guild_id);
							const deletedRole = deletedAt?.roles.get(data.d.role_id);
							this.bot.emit('guild.role.delete', deletedRole, deletedAt);
							if (deletedRole) deletedAt?.roles.delete(deletedRole.id.toString());
							break;

						case 'INVITE_CREATE':
							const createdInvite = new Invite(data.d, this.bot);
							this.bot.emit('invite.create', createdInvite);
							break;
						case 'INVITE_DELETE':
							const deletedInvite = new DeletedInvite(data.d, this.bot);
							this.bot.emit('invite.delete', deletedInvite);
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
							const deletedMessage: DeletedMessage = {
								id: new Snowflake(data.d.id),
								channelId: new Snowflake(data.d.channel_id),
								guildId: new Snowflake(data.d.guild_id),
							};
							this.bot.emit('message.delete', deletedMessage);
							break;
						case 'MESSAGE_DELETE_MESSAGE':
							const deletedMessages: DeletedMessages = {
								ids: data.d.id.map((id: string) => new Snowflake(id)),
								channelId: new Snowflake(data.d.channel_id),
								guildId: new Snowflake(data.d.guild_id),
							};
							this.bot.emit('message.bulk.delete', deletedMessages);
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
