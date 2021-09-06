import { ChannelTypes } from '../const/discord/channel';
import { Snowflake } from '../const/Snowflake';
import IOverwrite from './IOverwrite';
import IThreadMember from './IThreadMember';
import IThreadMetadata from './IThreadMetadata';
import { IUser } from './user/IUser';

export default interface IChannel {
	id: string;
	type: ChannelTypes;
	guild_id: string;
	position: number;
	permission_overwrites: IOverwrite[];
	name?: string;
	topic?: string;
	nsfw?: boolean;
	last_message_id?: string;
	bitrate?: number;
	user_limit?: number;
	rate_limit_per_user?: number;
	recipients?: IUser[];
	icon?: string;
	owner_id?: string;
	application_id?: string;
	parent_id?: string;
	last_pin_timestamp?: string;
	rtc_region?: string;
	video_quality_mode?: number;
	message_count?: number;
	member_count?: number;
	thread_metadata?: IThreadMetadata;
	member?: IThreadMember;
	default_auto_archive_duration?: Number;
}

export interface IChannelMention {
	id: Snowflake;
	guild_id: Snowflake;
	type: ChannelTypes;
	name: string;
}

export interface ITextChannel {
	id: string;
	name: string;
	type: 'GUILD_TEXT';
	guild_id: string;
	position: number;
	nsfw: boolean;
	rate_limit_per_user: number;
	permission_overwrites: IOverwrite[];
	last_pin_timestamp?: string;
	last_message_id?: string;
	parent_id?: string;
	topic?: string;
}

export interface IVoiceChannel {
	id: string;
	name: string;
	type: 'GUILD_VOICE';
	guild_id: string;
	position: number;
	user_limit: number;
	bitrate: number;
	permission_overwrites: IOverwrite[];
	rtc_region?: string;
	parent_id?: string;
	video_quality_mode?: number;
}

export interface ICategoty {
	id: string;
	name: string;
	type: 'GUILD_CATEGORY';
	guild_id: string;
	position: number;
	permission_overwrites: IOverwrite[];
}

export interface IThreadChannel extends ITextChannel {
	member_count: number;
	message_count: number;
	thread_metadata: IThreadMetadata;
	// member: IThreadMember;
}

export interface IDMChannel {
	id: string;
	type: 'DM';
	last_message_id: string;
	last_pin_timestamp: string;
	recipients: IUser[];
}
