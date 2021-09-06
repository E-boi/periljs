import { VideoQualityModes } from '../../const/discord/channel';
import { Snowflake } from '../../const/Snowflake';
import { IVoiceChannel } from '../../intf/IChannel';
import IOverwrite from '../../intf/IOverwrite';

export default class VoiceChannel {
	id: Snowflake;
	name: string;
	type: 'GUILD_VOICE' = 'GUILD_VOICE';
	guildId: Snowflake;
	position: number;
	maxUsers: number;
	bitrate: number;
	permissionOverwrites: IOverwrite[];
	rtcRegion?: string;
	parentId?: Snowflake;
	videoQualityMode?: keyof typeof VideoQualityModes;
	constructor(channel: IVoiceChannel) {
		this.id = new Snowflake(channel.id);
		this.name = channel.name;
		this.guildId = new Snowflake(channel.guild_id);
		this.position = channel.position;
		this.maxUsers = channel.user_limit;
		this.bitrate = channel.bitrate;
		this.permissionOverwrites = channel.permission_overwrites;
		this.rtcRegion = channel.rtc_region;
		this.parentId = new Snowflake(channel.parent_id);
		this.videoQualityMode = channel.video_quality_mode && (VideoQualityModes[channel.video_quality_mode] as any);
	}
}
