import { API_URI } from '../../constants';
import IMessage, { IMessageCreate } from '../intf/IMessage';
import fetch, { BodyInit, HeadersInit, Response } from 'node-fetch';
import { Snowflake } from '../const/Snowflake';
import { IApplicationCommand } from '../intf/IApplicationCommand';
import { ApplicationCommandOptionType, ApplicationCommandTypes } from '../const/discord/interaction';
import { IMessageCommandCreate, ISlashCreate, IUserCommandCreate } from '../intf/IInteraction';
import Client from './client';
import Message from './Message';
import IChannel, { IThreadChannel } from '../intf/IChannel';
import IGuildMember from '../intf/guild/IGuildMember';
import { ICreateCategory, ICreateTextChannel, ICreateVoiceChannel } from '../intf/ICreateChannel';
import { ChannelTypes } from '../const/discord/channel';
import { createChannelClass } from './util/channel';
import { ThreadChannel } from './channels';
import IThreadMember from '../intf/IThreadMember';

export default class HTTP {
	private base_url: string;
	private token: string;
	private headers: HeadersInit;
	readonly bot: Client;
	constructor(token: string, bot: Client) {
		this.base_url = API_URI;
		this.token = token;
		this.bot = bot;
		this.headers = {
			'User-Agent': 'periljs (https://discord.gg/aCwa6nFj4z, v1)',
			'Content-Type': 'application/json',
			Authorization: `Bot ${this.token}`,
		};
	}

	post(url: string, body: BodyInit, headers?: HeadersInit) {
		return fetch(`${this.base_url}${url}`, { method: 'POST', body, headers: { ...this.headers, ...headers } });
	}

	get(url: string, headers?: HeadersInit): Promise<Response> {
		return fetch(`${this.base_url}${url}`, { method: 'GET', headers: { ...this.headers, ...headers } });
	}

	put(url: string, body?: BodyInit, headers?: HeadersInit) {
		if (!body) body = JSON.stringify({});
		return fetch(`${this.base_url}${url}`, { method: 'PUT', headers: { ...this.headers, ...(headers || {}) }, body });
	}

	delete(url: string, headers?: HeadersInit) {
		return fetch(`${this.base_url}${url}`, { method: 'DELETE', headers: { ...this.headers, ...headers } });
	}

	async sendMessage(message: IMessageCreate, channel_id: string): Promise<IMessage> {
		const messageReq = await this.post(`/channels/${channel_id}/messages`, JSON.stringify(message));
		if (!messageReq.ok) throw Error(await messageReq.text());
		const messageObj: IMessage = (await messageReq.json()) as IMessage;
		return messageObj;
	}

	async getMessage(message_id: string, channel_id: string): Promise<Message | undefined> {
		const messageReq = await this.get(`/channels/${channel_id}/messages/${message_id}`);
		if (!messageReq.ok) throw Error(await messageReq.text());
		const message: Message = new Message((await messageReq.json()) as IMessage, this.bot);
		return message;
	}

	async getMessages(channel_id: string, limit: number = 50): Promise<IMessage[] | undefined> {
		const messagesReq = await this.get(`/channels/${channel_id}/messages?limit=${limit}`);
		if (!messagesReq.ok) throw Error(await messagesReq.text());
		const messages: IMessage[] = (await messagesReq.json()) as IMessage[];
		return messages;
	}

	async deleteMessage(message_id: string, channel_id: string, headers?: { 'X-Audit-Log-Reason'?: string }): Promise<boolean> {
		const messageReq = await this.delete(`/channels/${channel_id}/messages/${message_id}`, headers);
		if (!messageReq.ok) throw Error(await messageReq.text());
		return true;
	}

	async getPinsMessages(channel_id: string) {
		const channelReq = await this.get(`/channels/${channel_id}/pins`);
		if (!channelReq.ok) throw Error(await channelReq.text());
		return (await channelReq.json()) as IMessage[];
	}

	async reactToMessage(channel_id: string, message_id: string, emoji: string) {
		const req = await this.put(`/channels/${channel_id}/messages/${message_id}/reactions/${emoji}/@me`);
		if (!req.ok) throw Error(await req.text());
		return true;
	}

	async deleteUserReaction(channel_id: string, message_id: string, user_id: string, emoji: string) {
		const req = await this.delete(`/channels/${channel_id}/messages/${message_id}/reactions/${emoji}/${user_id}`);
		if (!req.ok) throw Error(await req.text());
		return true;
	}

	async deleteOwnReaction(channel_id: string, message_id: string, emoji: string) {
		const req = await this.delete(`/channels/${channel_id}/messages/${message_id}/reactions/${emoji}/@me`);
		if (!req.ok) throw Error(await req.text());
		return true;
	}

	async getChannel(channel_id: string) {
		const channelReq = await this.get(`/channels/${channel_id}`);
		if (!channelReq.ok) return;
		return (await channelReq.json()) as IChannel;
	}

	async triggerTyping(channel_id: string) {
		const channelReq = await this.post(`/channels/${channel_id}/typing`, JSON.stringify({}));
		if (!channelReq.ok) throw Error(await channelReq.text());
		return true;
	}

	async startThreadWithMessage(channel_id: string, name: string, message_id: string) {
		const threadReq = await this.post(`/channels/${channel_id}/messages/${message_id}/threads`, JSON.stringify({ name }));
		if (!threadReq.ok) throw Error(await threadReq.text());
		return new ThreadChannel((await threadReq.json()) as IThreadChannel, this);
	}

	async startThread(channel_id: string, name: string) {
		const threadReq = await this.post(`/channels/${channel_id}/threads`, JSON.stringify({ name, type: 11 }));
		if (!threadReq.ok) throw Error(await threadReq.text());
		return new ThreadChannel((await threadReq.json()) as IThreadChannel, this);
	}

	async joinThread(channel_id: string) {
		const threadReq = await this.put(`/channels/${channel_id}/thread-members/@me`);
		if (!threadReq.ok) throw Error(await threadReq.text());
		return true;
	}

	async addThreadMember(channel_id: string, user_id: string) {
		const threadReq = await this.put(`/channels/${channel_id}/thread-members/${user_id}`);
		if (!threadReq.ok) throw Error(await threadReq.text());
		return;
	}

	async removeThreadMember(channel_id: string, useer_id: string) {
		const threadReq = await this.delete(`/channels/${channel_id}/thread-members/${useer_id}`);
		if (!threadReq.ok) throw Error(await threadReq.text());
		return;
	}

	async listThreadMembers(channel_id: string) {
		const threadReq = await this.get(`/channels/${channel_id}/thread-members`);
		if (!threadReq.ok) throw Error(await threadReq.text());
		return (await threadReq.json()) as IThreadMember[];
	}

	async listActiveThreads(channel_id: string) {
		const threadReq = await this.get(`/channels/${channel_id}/threads/active`);
		if (!threadReq.ok) throw Error(await threadReq.text());
		return (await threadReq.json()) as { threads: IThreadChannel[]; members: IThreadMember[]; has_more: boolean };
	}

	async getIntercationCommands() {
		const commandsReq = await this.get(`/applications/${this.bot.bot!.id}/commands`);
		if (!commandsReq.ok) throw Error(await commandsReq.text());
		const commands: IApplicationCommand[] = (await commandsReq.json()) as IApplicationCommand[];
		commands.map(command => command.type && (command.type = ApplicationCommandTypes[command.type] as any));
		return commands;
	}

	async getGuildInteraction(guild_id: string) {
		const commandsReq = await this.get(`/applications/${this.bot.bot!.id}/guilds/${guild_id}/commands`);
		if (!commandsReq.ok) throw Error(await commandsReq.text());
		const commands: IApplicationCommand[] = (await commandsReq.json()) as IApplicationCommand[];
		commands.map(command => command.type && (command.type = ApplicationCommandTypes[command.type] as any));
		return commands;
	}

	async setInteraction(
		command: (IUserCommandCreate | ISlashCreate | IMessageCommandCreate)[] | (ISlashCreate | IUserCommandCreate | IMessageCommandCreate)
	) {
		if (!Array.isArray(command)) command = [command];
		command = command.map(c => {
			if (c.type === 'CHAT_INPUT')
				c.options = c.options?.map(opt => {
					opt.type = ApplicationCommandOptionType[opt.type] as any;
					return opt;
				});
			c.type = ApplicationCommandTypes[c.type] as any;
			return c;
		});
		return this.put(`/applications/${this.bot.bot!.id}/commands`, JSON.stringify(command));
	}

	async setGuildInteraction(
		command: (IUserCommandCreate | ISlashCreate | IMessageCommandCreate)[] | (ISlashCreate | IUserCommandCreate | IMessageCommandCreate),
		guild: Snowflake | string
	) {
		if (!Array.isArray(command)) command = [command];
		command = command.map(c => {
			if (c.type === 'CHAT_INPUT')
				c.options = c.options?.map(opt => {
					opt.type = ApplicationCommandOptionType[opt.type] as any;
					return opt;
				});
			c.type = ApplicationCommandTypes[c.type] as any;
			return c;
		});
		return this.put(`/applications/${this.bot.bot!.id}/guilds/${guild}/commands`, JSON.stringify(command));
	}

	async deleteInteraction(command_id: string) {
		const commandReq = await this.delete(`/applications/${this.bot.bot!.id}/commands/${command_id}`);
		if (!commandReq.ok) throw Error(await commandReq.text());
		return true;
	}

	async deleteGuildInteraction(command_id: string, guild_id: string) {
		const commandReq = await this.delete(`/applications/${this.bot.bot!.id}/guilds/${guild_id}/commands/${command_id}`);
		if (!commandReq.ok) throw Error(await commandReq.text());
		return true;
	}

	async fetchGuildUser(user_id: string, guild_id: string) {
		const userReq = await this.get(`/guilds/${guild_id}/members/${user_id}`);
		if (!userReq.ok) return;
		return (await userReq.json()) as IGuildMember;
	}

	async banUser(user_id: string, guild_id: string, reason?: string) {
		const banReq = await this.put(`/guilds/${guild_id}/bans/${user_id}`, undefined, reason ? { 'X-Audit-Log-Reason': reason } : {});
		if (!banReq.ok) throw Error("Can't ban a user without BAN_MEMBERS permission");
		return true;
	}

	async kickUser(user_id: string, guild_id: string, reason?: string) {
		const kickReq = await this.delete(`/guilds/${guild_id}/members/${user_id}`, reason ? { 'X-Audit-Log-Reason': reason } : {});
		if (!kickReq.ok) throw Error("Can't kick a user without KICK_MEMBERS permission");
		return true;
	}

	async createGuildChannel(guild_id: string, channel: ICreateTextChannel | ICreateVoiceChannel | ICreateCategory) {
		channel.type = ChannelTypes[channel.type] as any;
		const channelReq = await this.post(`/guilds/${guild_id}/channels`, JSON.stringify(channel));
		if (!channelReq.ok) throw Error(await channelReq.text());
		return createChannelClass((await channelReq.json()) as IChannel, this);
	}
}
