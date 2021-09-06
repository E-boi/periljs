import { API_URI } from '../../constants';
import IMessage, { IMessageCreate } from '../intf/IMessage';
import fetch, { BodyInit, HeadersInit, Response } from 'node-fetch';
import { Snowflake } from '../const/Snowflake';
import { IApplicationCommand } from '../intf/IApplicationCommand';
import { ApplicationCommandOptionType, ApplicationCommandTypes } from '../const/discord/interaction';
import { IMessageCommandCreate, ISlashCreate, IUserCommandCreate } from '../intf/IInteraction';
import Client from './client';
import Message from './Message';
import IChannel from '../intf/IChannel';
import IGuildMember from '../intf/guild/IGuildMember';

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

	put(url: string, body: BodyInit, headers?: HeadersInit) {
		return fetch(`${this.base_url}${url}`, { method: 'PUT', headers: { ...this.headers, ...headers }, body });
	}

	delete(url: string, headers?: HeadersInit) {
		return fetch(`${this.base_url}${url}`, { method: 'DELETE', headers: { ...this.headers, ...headers } });
	}

	async sendMessage(message: IMessageCreate, channel_id: string): Promise<IMessage> {
		const messageReq = await this.post(`/channels/${channel_id}/messages`, JSON.stringify(message));
		const messageObj: IMessage = (await messageReq.json()) as IMessage;
		return messageObj;
	}

	async getMessage(message_id: string, channel_id: string): Promise<Message | undefined> {
		const messageReq = await this.get(`/channels/${channel_id}/messages/${message_id}`);
		if (!messageReq.ok) return undefined;
		const message: Message = new Message((await messageReq.json()) as IMessage, this.bot);
		return message;
	}

	async getMessages(channel_id: string, limit: number = 50): Promise<IMessage[] | undefined> {
		const messagesReq = await this.get(`/channels/${channel_id}/messages?limit=${limit}`);
		if (!messagesReq.ok) return undefined;
		const messages: IMessage[] = (await messagesReq.json()) as IMessage[];
		return messages;
	}

	async deleteMessage(message_id: string, channel_id: string, headers?: { 'X-Audit-Log-Reason'?: string }): Promise<boolean> {
		const messageReq = await this.delete(`/channels/${channel_id}/messages/${message_id}`, JSON.stringify(headers));
		if (!messageReq.ok) return false;
		return true;
	}

	async getChannel(channel_id: string) {
		const channelReq = await this.get(`/channels/${channel_id}`);
		if (!channelReq.ok) return;
		return (await channelReq.json()) as IChannel;
	}

	async getIntercationCommands() {
		const commandsReq = await this.get(`/applications/${this.bot.bot?.id}/commands`);
		const commands: IApplicationCommand[] = (await commandsReq.json()) as IApplicationCommand[];
		commands.map(command => command.type && (command.type = ApplicationCommandTypes[command.type] as any));
		return commands;
	}

	async setCommand(
		command: (IUserCommandCreate | ISlashCreate | IMessageCommandCreate)[] | (ISlashCreate | IUserCommandCreate | IMessageCommandCreate)
	) {
		if (Array.isArray(command)) {
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
		} else {
			if (command.type === 'CHAT_INPUT')
				command.options = command.options?.map(opt => {
					opt.type = ApplicationCommandOptionType[opt.type] as any;
					return opt;
				});
			command.type = ApplicationCommandTypes[command.type] as any;
			return this.post(`/applications/${this.bot.bot!.id}/commands`, JSON.stringify(command));
		}
	}

	async setGuildCommand(
		command: (IUserCommandCreate | ISlashCreate | IMessageCommandCreate)[] | (ISlashCreate | IUserCommandCreate | IMessageCommandCreate),
		guild: Snowflake | string
	) {
		if (Array.isArray(command)) {
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
		} else {
			command.type = ApplicationCommandTypes[command.type] as any;
			if (command.type === 'CHAT_INPUT')
				command.options = command.options?.map(opt => {
					opt.type = ApplicationCommandOptionType[opt.type] as any;
					return opt;
				});
			return this.post(`/applications/${this.bot.bot!.id}/guilds/${guild}/commands`, JSON.stringify(command));
		}
	}

	async fetchGuildUser(user_id: string, guild_id: string) {
		const userReq = await this.get(`/guilds/${guild_id}/members/${user_id}`);
		if (!userReq.ok) return;
		return (await userReq.json()) as IGuildMember;
	}
}
