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
import IGuild from '../../intf/guild/IGuild';
import IStageInstance from '../../intf/guild/IStageInstance';
import ISticker from '../../intf/guild/ISticker';
import IWelcomeScreen from '../../intf/guild/IWelcomeScreen';
import IPresenceUpdate from '../../intf/IPresenceUpdate';
import IVoiceStates from '../../intf/IVoiceStates';
import Channels from '../Channels';
import Category from '../channels/Category';
import TextChannel from '../channels/TextChannel';
import ThreadChannel from '../channels/ThreadChannel';
import VoiceChannel from '../channels/VoiceChannel';
import HTTP from '../HTTP';
import { getDateFromID } from '../util/snowflake';
import Emoji from './GuildEmoji';
import { GuildMember } from './GuildMember';
import Role from './Role';

export default class Guild {
	id: Snowflake;
	name: string;
	owner_id: Snowflake;
	verificationLevel: keyof typeof VerificationLevel;
	defaultMessageNotifications: keyof typeof DefaultMessageNotificationsLevel;
	explicitContentFilter: ExplicitContentFilterLevel;
	roles: Map<string, Role> = new Map();
	emojis: Map<string, Emoji> = new Map();
	features: GuildFeatures[];
	mfaLevel: keyof typeof MFALevel;
	nsfwLevel: keyof typeof NSFWLevel;
	premiumTier: keyof typeof PremiumTypes;
	channels: Channels<string, TextChannel | VoiceChannel | Category>;
	threads: Map<string, ThreadChannel> = new Map();
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
	members: Map<string, GuildMember> = new Map();
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
	private HTTP: HTTP;
	constructor(guild: IGuild, http: HTTP) {
		this.id = new Snowflake(guild.id);
		this.name = guild.name;
		this.owner_id = new Snowflake(guild.owner_id);
		this.verificationLevel = VerificationLevel[guild.verification_level] as keyof typeof VerificationLevel;
		this.defaultMessageNotifications = DefaultMessageNotificationsLevel[guild.default_message_notifications] as any;
		this.explicitContentFilter = ExplicitContentFilterLevel[guild.explicit_content_filter] as any;
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
		this.channels = new Channels(this.id.toString(), http);

		guild.channels.forEach(channel => {
			if (channel.type === 0) return this.channels.set(channel.id, new TextChannel(channel as any, http));
			else if (channel.type === 2) return this.channels.set(channel.id, new VoiceChannel(channel as any));
			else if (channel.type === 4) return this.channels.set(channel.id, new Category(channel as any));
			else return;
		});

		guild.members?.forEach(member => this.members.set(member.user.id, new GuildMember(member, this)));
		guild.threads.forEach(thread => this.threads.set(thread.id, new ThreadChannel(thread, http)));
		guild.roles.forEach(role => this.roles.set(role.id, new Role(role)));
		guild.emojis.map(emoji => this.emojis.set(emoji.id, new Emoji(emoji)));

		this.HTTP = http;
	}

	async fetchUser(user_id: string) {
		if (this.members.has(user_id)) return this.members.get(user_id);
		const user = await this.HTTP.fetchGuildUser(user_id, this.id.toString());
		if (!user) return;
		const member = new GuildMember(user, this);
		this.members.set(user_id, member);
		return member;
	}

	async ban(id: string, reason?: string) {
		return this.HTTP.banUser(id, this.id.toString(), reason);
	}

	async kick(id: string, reason?: string) {
		return this.HTTP.kickUser(id, this.id.toString(), reason);
	}
}
