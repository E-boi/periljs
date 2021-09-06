import {
	DefaultMessageNotificationsLevel,
	ExplicitContentFilterLevel,
	GuildFeatures,
	MFALevel,
	SystemChannelFlags,
	VerificationLevel,
} from '../../const/discord/guild/features';
import { NSFWLevel, PremiumTypes } from '../../const/discord/guild/level';
import { Snowflake } from '../../const/Snowflake';
import IChannel, { IThreadChannel } from '../IChannel';
import IEmoji from './IEmoji';
import IGuildMember from './IGuildMember';
import IPresenceUpdate from '../IPresenceUpdate';
import IRole from './IRole';
import IVoiceStates from '../IVoiceStates';
import IWelcomeScreen from './IWelcomeScreen';
import IStageInstance from './IStageInstance';
import ISticker from './ISticker';

export default interface IGuild {
	id: Snowflake;
	name: string;
	owner_id: Snowflake;
	verification_level: VerificationLevel;
	default_message_notifications: DefaultMessageNotificationsLevel;
	explicit_content_filter: ExplicitContentFilterLevel;
	roles: IRole[];
	emojis: IEmoji[];
	features: GuildFeatures[];
	mfa_level: MFALevel;
	nsfw_level: NSFWLevel;
	premium_tier: PremiumTypes;
	icon?: string;
	icon_hash?: string;
	splash?: string;
	discovery_splash?: string;
	afk_channel_id?: Snowflake;
	widget_enabled?: boolean;
	widget_channel_id?: Snowflake;
	application_id?: Snowflake;
	system_channel_id?: Snowflake;
	system_channel_flags: SystemChannelFlags;
	rules_channel_id?: Snowflake;
	joined_at?: string;
	large?: boolean;
	unavailable?: boolean;
	member_count?: number;
	voice_states?: IVoiceStates[];
	members?: IGuildMember[];
	channels: IChannel[];
	threads: IThreadChannel[];
	presences?: IPresenceUpdate[];
	max_presences?: number;
	vanity_url_code?: string;
	description?: string;
	banner?: string;
	premium_subscription_count?: number;
	preferred_locale: string;
	public_updates_channel_id?: Snowflake;
	max_video_channel_users?: number;
	approximate_member_count?: number;
	approximate_presence_count?: number;
	welcome_screen?: IWelcomeScreen;
	stage_instances?: IStageInstance[];
	stickers?: ISticker[];
}
