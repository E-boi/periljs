import { Bitfield } from "./bitfield";
import { createChannel } from "./channels";
import { GuildChannel } from "./channels/guild";
import { ThreadChannel } from "./channels/thread";
import { Client } from "./client";
import { Emoji } from "./emoji";
import {
  DefaultMessageNotifications,
  ExplicitContentFilter,
  GuildFeatures,
  MFALevel,
  NSFWLevel,
  ServerBoostLevel,
  SystemChannelFlags,
  VerificationLevel,
} from "./enums";
import { GuildMember } from "./member";
import { RawGuild } from "./rawTypes";
import { Role } from "./role";
import { Sticker } from "./sticker";

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
  verificationLevel: VerificationLevel;
  defaultMessageNotifications: DefaultMessageNotifications;
  explicitContentFilter: ExplicitContentFilter;
  emojis: Map<string, Emoji> = new Map();
  features?: GuildFeatures[];
  mfaLevel: MFALevel;
  systemChannelId?: string;
  systemChannelFlags: Bitfield<SystemChannelFlags>;
  rulesChannelId?: string;
  maxMembers?: number;
  vanityUrlCode?: string;
  description?: string;
  banner?: string;
  premiumTier: ServerBoostLevel;
  premiumSubscriptionCount?: number;
  preferredLocale?: string;
  publicUpdatesChannelId?: string;
  nsfwLevel: NSFWLevel;
  stickers: Map<string, Sticker> = new Map();
  premiumProgressBarEnabled: boolean;
  channels: Map<string, GuildChannel> = new Map();
  threads: Map<string, ThreadChannel> = new Map();
  members: Map<string, GuildMember> = new Map();
  roles: Map<string, Role> = new Map();
  private client: Client;

  constructor(guild: RawGuild, client: Client) {
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
    this.verificationLevel = guild.verification_level;
    this.defaultMessageNotifications = guild.default_message_notifications;
    this.explicitContentFilter = guild.explicit_content_filter;
    this.features = guild.features;
    this.mfaLevel = guild.mfa_level;
    this.systemChannelId = guild.system_channel_id;
    this.systemChannelFlags = new Bitfield(guild.system_channel_flags);
    this.rulesChannelId = guild.rules_channel_id;
    this.maxMembers = guild.max_members;
    this.vanityUrlCode = guild.vanity_url_code;
    this.description = guild.description;
    this.banner = guild.banner;
    this.premiumTier = guild.premium_tier;
    this.premiumSubscriptionCount = guild.premium_subscription_count;
    this.preferredLocale = guild.preferred_locale;
    this.publicUpdatesChannelId = guild.public_updates_channel_id;
    this.nsfwLevel = guild.nsfw_level;
    this.premiumProgressBarEnabled = guild.premium_progress_bar_enabled;
    this.client = client;

    guild.channels?.forEach((channel) => {
      channel.guild_id = this.id;
      const c = createChannel(channel, client);
      if (!c?.inGuild()) return;
      this.channels.set(channel.id, c);
    });
    guild.threads?.forEach((thread) => {
      thread.guild_id = this.id;
      this.threads.set(thread.id, new ThreadChannel(thread, client));
    });
    guild.members?.forEach((member) =>
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.members.set(member.user!.id, new GuildMember(member, this, client))
    );
    guild.roles.forEach((role) => this.roles.set(role.id, new Role(role)));
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    guild.emojis.forEach((emoji) => this.emojis.set(emoji.id!, new Emoji(emoji)));
    guild.stickers?.forEach((sticker) => this.stickers.set(sticker.id, new Sticker(sticker)));
  }
}
