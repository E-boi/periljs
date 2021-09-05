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
	verificationLevel: keyof typeof VerificationLevel;
	defaultMessageNotifications: keyof typeof DefaultMessageNotificationsLevel;
	explicitContentFilter: ExplicitContentFilterLevel;
	roles: IRole[];
	emojis: IEmoji[];
	features: GuildFeatures[];
	mfaLevel: keyof typeof MFALevel;
	nsfwLevel: keyof typeof NSFWLevel;
	premiumTier: keyof typeof PremiumTypes;
	channels: IChannel[];
	threads: IChannel[];
	preferredLocale: string;
	icon?: string;
	iconHash?: string;
	splash?: string;
	discoverySplash?: string;
	afkChannelId?: Snowflake;
	widgetEnabled?: boolean;
	widgetChannelId?: Snowflake;
	applicationId?: Snowflake;
	systemChannelId?: Snowflake;
	systemChannelFlags: keyof typeof SystemChannelFlags;
	rulesChannelId?: Snowflake;
	joinedAt?: Date;
	createdAt: Date;
	large?: boolean;
	unavailable?: boolean;
	memberCount?: number;
	voiceStates?: IVoiceStates[];
	members?: GuildMember[];
	presences?: IPresenceUpdate[];
	maxPresences?: number;
	vanityUrlCode?: string;
	description?: string;
	banner?: string;
	premiumSubscriptionCount?: number;
	publicUpdatesChannelId?: Snowflake;
	maxVideoChannelUsers?: number;
	// approximateMemberCount?: number;
	// approximatePresenceCount?: number;
	welcomeScreen?: IWelcomeScreen;
	stageInstances?: IStageInstance[];
	stickers?: ISticker[];
	constructor(guild: IGuild) {
		this.id = new Snowflake(guild.id);
		this.name = guild.name;
		this.owner_id = new Snowflake(guild.owner_id);
		this.verificationLevel = VerificationLevel[guild.verification_level] as keyof typeof VerificationLevel;
		this.defaultMessageNotifications = DefaultMessageNotificationsLevel[guild.default_message_notifications] as any;
		this.explicitContentFilter = ExplicitContentFilterLevel[guild.explicit_content_filter] as any;
		this.roles = guild.roles;
		this.emojis = guild.emojis;
		this.features = guild.features;
		this.mfaLevel = MFALevel[guild.mfa_level] as keyof typeof MFALevel;
		this.nsfwLevel = NSFWLevel[guild.nsfw_level] as keyof typeof NSFWLevel;
		this.premiumTier = PremiumTypes[guild.premium_tier] as keyof typeof PremiumTypes;
		this.icon = guild.icon;
		this.iconHash = guild.icon_hash;
		this.splash = guild.splash;
		this.discoverySplash = guild.discovery_splash;
		this.afkChannelId = guild.afk_channel_id;
		this.widgetEnabled = guild.widget_enabled;
		this.widgetChannelId = guild.widget_channel_id;
		this.applicationId = guild.application_id && new Snowflake(guild.application_id);
		this.systemChannelId = guild.system_channel_id && new Snowflake(guild.system_channel_id);
		this.systemChannelFlags = SystemChannelFlags[guild.system_channel_flags] as keyof typeof SystemChannelFlags;
		this.rulesChannelId = guild.rules_channel_id && new Snowflake(guild.rules_channel_id);
		this.joinedAt = (guild.joined_at && new Date(guild.joined_at)) || undefined;
		this.large = guild.large;
		this.unavailable = guild.unavailable;
		this.memberCount = guild.member_count;
		this.voiceStates = guild.voice_states;
		this.members = guild.members?.map(member => new GuildMember(member));
		this.channels = guild.channels;
		this.threads = guild.threads;
		this.presences = guild.presences;
		this.maxPresences = guild.max_presences;
		this.vanityUrlCode = guild.vanity_url_code;
		this.description = guild.description;
		this.banner = guild.banner;
		this.premiumSubscriptionCount = guild.premium_subscription_count;
		this.preferredLocale = guild.preferred_locale;
		this.publicUpdatesChannelId = guild.public_updates_channel_id;
		this.maxVideoChannelUsers = guild.max_video_channel_users;
		// this.approximateMemberCount = guild.approximate_member_count;
		// this.approximatePresenceCount = guild.approximate_presence_count;
		this.welcomeScreen = guild.welcome_screen;
		this.stageInstances = guild.stage_instances;
		this.stickers = guild.stickers;
		this.createdAt = getDateFromID(this.id);
	}
}
