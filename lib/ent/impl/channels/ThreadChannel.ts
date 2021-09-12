import { ChannelTypes } from '../../const/discord/channel';
import { Snowflake } from '../../const/Snowflake';
import { IThreadChannel } from '../../intf/IChannel';
import IThreadMetadata from '../../intf/IThreadMetadata';
import HTTP from '../HTTP';
import BaseTextChannel from './BaseTextChannel';

export default class ThreadChannel extends BaseTextChannel {
	memberCount: number;
	messageCount: number;
	threadMetadata: IThreadMetadata;
	type: 'GUILD_PUBLIC_THREAD' | 'GUILD_PRIVATE_THREAD' = 'GUILD_PUBLIC_THREAD';
	parentId: Snowflake;
	guildId: Snowflake;
	rateLimitPerUser: number;
	private HTTPS: HTTP;
	constructor(channel: IThreadChannel, http: HTTP) {
		super(channel as any, http);
		this.parentId = new Snowflake(channel.parent_id);
		this.type = ChannelTypes[channel.type] as any;
		this.memberCount = channel.member_count;
		this.messageCount = channel.message_count;
		this.threadMetadata = channel.thread_metadata;
		this.guildId = new Snowflake(channel.guild_id);
		this.rateLimitPerUser = channel.rate_limit_per_user;

		this.HTTPS = http;
	}

	get parentChannel() {
		return this.HTTPS.bot.getChannelByID(this.parentId!.toString());
	}

	get guild() {
		return this.HTTPS.bot.getGuildByID(this.guildId);
	}

	toString() {
		return `<#${this.id}>`;
	}
}
