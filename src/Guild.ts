import {
  Category,
  createChannel,
  ForumChannel,
  TextChannel,
  ThreadChannel,
  VoiceChannel,
} from './Channel';
import { Emoji } from './Emoji';
import HTTPS from './HTTPS';
import {
  DefaultMessageNotifications,
  ExplicitContentFilter,
  GuildFeatures,
  MFALevel,
  NSFWLevel,
  RawGuild,
  ServerBoostLevel,
  SystemChannelFlags,
  VerificationLevel,
} from './RawTypes';
import { Role } from './Role';
import { Sticker } from './Sticker';
import { GuildMember } from './User';

export class Guild {
  id: string;
  name: string;
  icon?: string;
  iconHash?: string;
  splash?: string;
  discoverySplash?: string;
  ownerId: string;
  permissions?: string;
  afkChannelId?: string;
  afkTimeout: number;
  widgetEnabled?: boolean;
  widgetChannelId?: string;
  verificationLevel: keyof typeof VerificationLevel;
  defaultMessageNotifications: keyof typeof DefaultMessageNotifications;
  explicitContentFilter: keyof typeof ExplicitContentFilter;
  emojis: Map<string, Emoji> = new Map();
  features?: GuildFeatures[];
  mfaLevel: keyof typeof MFALevel;
  systemChannelId?: string;
  systemChannelFlags: SystemChannelFlags;
  rulesChannelId?: string;
  maxMembers?: number;
  vanityUrlCode?: string;
  description?: string;
  banner?: string;
  premiumTier: keyof typeof ServerBoostLevel;
  premiumSubscriptionCount?: number;
  preferredLocale?: string;
  publicUpdatesChannelId?: string;
  nsfwLevel: keyof typeof NSFWLevel;
  stickers: Map<string, Sticker> = new Map();
  premiumProgressBarEnabled: boolean;
  channels: Map<string, TextChannel | VoiceChannel | Category | ForumChannel> =
    new Map();
  threads: Map<string, ThreadChannel> = new Map();
  members: Map<string, GuildMember> = new Map();
  roles: Map<string, Role> = new Map();
  private request: HTTPS;

  constructor(guild: RawGuild, request: HTTPS) {
    this.id = guild.id;
    this.name = guild.name;
    this.icon = guild.icon;
    this.iconHash = guild.icon_hash;
    this.splash = guild.splash;
    this.discoverySplash = guild.discovery_splash;
    this.ownerId = guild.owner_id;
    this.permissions = guild.permissions;
    this.afkChannelId = guild.afk_channel_id;
    this.afkTimeout = guild.afk_timeout;
    this.widgetEnabled = guild.widget_enabled;
    this.widgetChannelId = guild.widget_channel_id;
    this.verificationLevel = VerificationLevel[
      guild.verification_level
    ] as keyof typeof VerificationLevel;
    this.defaultMessageNotifications = DefaultMessageNotifications[
      guild.default_message_notifications
    ] as keyof typeof DefaultMessageNotifications;
    this.explicitContentFilter = ExplicitContentFilter[
      guild.explicit_content_filter
    ] as keyof typeof ExplicitContentFilter;
    this.features = guild.features;
    this.mfaLevel = MFALevel[guild.mfa_level] as keyof typeof MFALevel;
    this.systemChannelId = guild.system_channel_id;
    this.systemChannelFlags = guild.system_channel_flags;
    this.rulesChannelId = guild.rules_channel_id;
    this.maxMembers = guild.max_members;
    this.vanityUrlCode = guild.vanity_url_code;
    this.description = guild.description;
    this.banner = guild.banner;
    this.premiumTier = ServerBoostLevel[
      guild.premium_tier
    ] as keyof typeof ServerBoostLevel;
    this.premiumSubscriptionCount = guild.premium_subscription_count;
    this.preferredLocale = guild.preferred_locale;
    this.publicUpdatesChannelId = guild.public_updates_channel_id;
    this.nsfwLevel = NSFWLevel[guild.nsfw_level] as keyof typeof NSFWLevel;
    this.premiumProgressBarEnabled = guild.premium_progress_bar_enabled;
    this.request = request;

    guild.channels?.forEach(channel => {
      channel.guild_id = this.id;
      const gchannel = createChannel(channel, request);
      if (!gchannel || !gchannel.inGuild() || gchannel.isThread()) return;
      this.channels.set(channel.id, gchannel);
    });
    guild.threads?.forEach(thread => {
      thread.guild_id = this.id;
      this.threads.set(thread.id, new ThreadChannel(thread, request));
    });
    guild.members?.forEach(member =>
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.members.set(member.user!.id, new GuildMember(member, this, request))
    );
    guild.roles.forEach(role => this.roles.set(role.id, new Role(role)));
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    guild.emojis.forEach(emoji => this.emojis.set(emoji.id!, new Emoji(emoji)));
    guild.stickers?.forEach(sticker =>
      this.stickers.set(sticker.id, new Sticker(sticker))
    );
  }

  /**
   * Fetches roles from Discord and caches them
   */
  async fetchRoles() {
    const roles = await this.request
      .getGuildRoles(this.id)
      .then(e => e.map(r => new Role(r)));
    roles.forEach(r => this.roles.set(r.id, r));
  }
}
