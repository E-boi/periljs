import { ChannelTypes } from '../const/discord/channel';
import { Permissions } from '../const/discord/permissions';
import { Snowflake } from '../const/Snowflake';
import IOverwrite from './IOverwrite';
import IThreadMember from './IThreadMember';
import IThreadMetadata from './IThreadMetadata';
import { IUser } from './user/IUser';

export default interface IChannel {
	id: Snowflake;
	type: number;
	guild_id: Snowflake;
	position: number;
	permission_overwrites: IOverwrite[];
	name?: string;
	topic?: string;
	nsfw?: boolean;
	last_message_id?: Snowflake;
	bitrate?: number;
	user_limit?: number;
	rate_limit_per_user?: number;
	recipients?: IUser[];
	icon?: string;
	owner_id?: Snowflake;
	application_id?: Snowflake;
	parent_id?: Snowflake;
	last_pin_timestamp?: string;
	rtc_region?: string;
	video_quality_mode?: number;
	message_count?: number;
	member_count?: number;
	thread_metadata?: IThreadMetadata;
	member?: IThreadMember;
	default_auto_archive_duration?: Number;
	permissions: Permissions;
}

export interface IChannelMention {
	id: Snowflake;
	guild_id: Snowflake;
	type: ChannelTypes;
	name: string;
}
