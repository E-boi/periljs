import { NSFWLevel, PremiumTypes } from '../../../constants';
import {
	DefaultMessageNotificationsLevel,
	ExplicitContentFilterLevel,
	MFALevel,
	VerificationLevel,
	GuildFeatures,
	SystemChannelFlags,
} from '../../const/discord/guild/features';
import { Snowflake } from '../../const/Snowflake';
import IEmoji from '../../intf/guild/IEmoji';
import IGuild from '../../intf/guild/IGuild';
import IGuildMember from '../../intf/guild/IGuildMember';
import IRole from '../../intf/guild/IRole';
import IStageInstance from '../../intf/guild/IStageInstance';
import ISticker from '../../intf/guild/ISticker';
import IWelcomeScreen from '../../intf/guild/IWelcomeScreen';
import IChannel from '../../intf/IChannel';
import IPresenceUpdate from '../../intf/IPresenceUpdate';
import IVoiceStates from '../../intf/IVoiceStates';
import { getDateFromID } from '../util/snowflake';
import { GuildMember } from './GuildMember';

export default class Guild {
	id: Snowflake;
	name: string;
	owner_id: Snowflake;
	verification_level: keyof typeof VerificationLevel;
	default_message_notifications: keyof typeof DefaultMessageNotificationsLevel;
	explicit_content_filter: ExplicitContentFilterLevel;
	roles: IRole[];
	emojis: IEmoji[];
	features: GuildFeatures[];
	mfa_level: keyof typeof MFALevel;
	nsfw_level: keyof typeof NSFWLevel;
	premium_tier: keyof typeof PremiumTypes;
	channels: IChannel[];
	threads: IChannel[];
	preferred_locale: string;
	icon?: string;
	icon_hash?: string;
	splash?: string;
	discovery_splash?: string;
	afk_channel_id?: Snowflake;
	widget_enabled?: boolean;
	widget_channel_id?: Snowflake;
	application_id?: Snowflake;
	system_channel_id?: Snowflake;
	system_channel_flags: keyof typeof SystemChannelFlags;
	rules_channel_id?: Snowflake;
	joinedAt?: Date;
	createdAt: Date;
	large?: boolean;
	unavailable?: boolean;
	member_count?: number;
	voice_states?: IVoiceStates[];
	members?: GuildMember[];
	presences?: IPresenceUpdate[];
	max_presences?: number;
	vanity_url_code?: string;
	description?: string;
	banner?: string;
	premium_subscription_count?: number;
	public_updates_channel_id?: Snowflake;
	max_video_channel_users?: number;
	approximate_member_count?: number;
	approximate_presence_count?: number;
	welcome_screen?: IWelcomeScreen;
	stage_instances?: IStageInstance[];
	stickers?: ISticker[];
	constructor(guild: IGuild) {
		this.id = new Snowflake(guild.id);
		this.name = guild.name;
		this.owner_id = new Snowflake(guild.owner_id);
		this.verification_level = VerificationLevel[guild.verification_level] as keyof typeof VerificationLevel;
		this.default_message_notifications = DefaultMessageNotificationsLevel[guild.default_message_notifications] as any;
		this.explicit_content_filter = ExplicitContentFilterLevel[guild.explicit_content_filter] as any;
		this.roles = guild.roles;
		this.emojis = guild.emojis;
		this.features = guild.features;
		this.mfa_level = MFALevel[guild.mfa_level] as keyof typeof MFALevel;
		this.nsfw_level = NSFWLevel[guild.nsfw_level] as keyof typeof NSFWLevel;
		this.premium_tier = PremiumTypes[guild.premium_tier] as keyof typeof PremiumTypes;
		this.icon = guild.icon;
		this.icon_hash = guild.icon_hash;
		this.splash = guild.splash;
		this.discovery_splash = guild.discovery_splash;
		this.afk_channel_id = guild.afk_channel_id;
		this.widget_enabled = guild.widget_enabled;
		this.widget_channel_id = guild.widget_channel_id;
		this.application_id = guild.application_id && new Snowflake(guild.application_id);
		this.system_channel_id = guild.system_channel_id && new Snowflake(guild.system_channel_id);
		this.system_channel_flags = SystemChannelFlags[guild.system_channel_flags] as keyof typeof SystemChannelFlags;
		this.rules_channel_id = guild.rules_channel_id && new Snowflake(guild.rules_channel_id);
		this.joinedAt = (guild.joined_at && new Date(guild.joined_at)) || undefined;
		this.large = guild.large;
		this.unavailable = guild.unavailable;
		this.member_count = guild.member_count;
		this.voice_states = guild.voice_states;
		this.members = guild.members?.map(member => new GuildMember(member));
		this.channels = guild.channels;
		this.threads = guild.threads;
		this.presences = guild.presences;
		this.max_presences = guild.max_presences;
		this.vanity_url_code = guild.vanity_url_code;
		this.description = guild.description;
		this.banner = guild.banner;
		this.premium_subscription_count = guild.premium_subscription_count;
		this.preferred_locale = guild.preferred_locale;
		this.public_updates_channel_id = guild.public_updates_channel_id;
		this.max_video_channel_users = guild.max_video_channel_users;
		this.approximate_member_count = guild.approximate_member_count;
		this.approximate_presence_count = guild.approximate_presence_count;
		this.welcome_screen = guild.welcome_screen;
		this.stage_instances = guild.stage_instances;
		this.stickers = guild.stickers;
		this.createdAt = getDateFromID(this.id);
	}
}
