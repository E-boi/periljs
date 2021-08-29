import { Snowflake } from '../const/Snowflake';
import IGuildMember from './guild/IGuildMember';

export default interface IVoiceStates {
	guild_id?: Snowflake;
	channel_id?: Snowflake;
	user_id: Snowflake;
	member?: IGuildMember;
	session_id: string;
	deaf: boolean;
	mute: boolean;
	self_deaf: boolean;
	self_mute: boolean;
	self_stream?: boolean;
	self_video: boolean;
	suppress: boolean;
}
