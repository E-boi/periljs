import { ThreadChannel } from '.';
import { Snowflake } from '../../const/Snowflake';
import { ITextChannel } from '../../intf/IChannel';
import IOverwrite from '../../intf/IOverwrite';
import HTTP from '../HTTP';
import BaseTextChannel from './BaseTextChannel';

export default class TextChannel extends BaseTextChannel {
	type: 'GUILD_TEXT' = 'GUILD_TEXT';
	guildId: Snowflake;
	position: number;
	nsfw: boolean;
	rateLimitPerUser: number;
	permissionOverwrites: IOverwrite[];
	parentId?: Snowflake;
	topic?: string;
	private http: HTTP;
	constructor(channel: ITextChannel, http: HTTP) {
		super(channel, http);
		this.guildId = new Snowflake(channel.guild_id);
		this.position = channel.position;
		this.nsfw = channel.nsfw ?? false;
		this.rateLimitPerUser = channel.rate_limit_per_user;
		this.permissionOverwrites = channel.permission_overwrites;
		this.parentId = (channel.parent_id && new Snowflake(channel.parent_id)) || undefined;
		this.topic = channel.topic;
		this.http = http;
	}

	async createThread(name: string, message_id?: string) {
		if (message_id) return this.http.startThreadWithMessage(this.id.toString(), name, message_id);
		else return this.http.startThread(this.id.toString(), name);
	}

	async fetchActiveThreads() {
		const { threads } = await this.http.listActiveThreads(this.id.toString());
		return threads.map(thread => new ThreadChannel(thread, this.http));
	}

	toString() {
		return `<#${this.id}>`;
	}
}
