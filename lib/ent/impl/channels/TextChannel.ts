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
	constructor(channel: ITextChannel, http: HTTP) {
		super(channel, http);
		this.guildId = new Snowflake(channel.guild_id);
		this.position = channel.position;
		this.nsfw = channel.nsfw ?? false;
		this.rateLimitPerUser = channel.rate_limit_per_user;
		this.permissionOverwrites = channel.permission_overwrites;
		this.parentId = (channel.parent_id && new Snowflake(channel.parent_id)) || undefined;
		this.topic = channel.topic;
	}

	toString() {
		return `<#${this.id}>`;
	}
}
