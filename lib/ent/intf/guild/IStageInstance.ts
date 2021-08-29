import { PrivacyLevel } from '../../const/discord/guild/level';
import { Snowflake } from '../../const/Snowflake';

export default interface IStageInstance {
	id: Snowflake;
	guild_id: Snowflake;
	channel_id: Snowflake;
	topic: string;
	privacy_level: PrivacyLevel;
	discoverable_disabled: boolean;
}
