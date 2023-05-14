/**
 * @module Raw Discord Types
 */

import {
  AllowedMentionTypes,
  ButtonStyle,
  ChannelFlags,
  ChannelTypes,
  CommandOptionTypes,
  CommandTypes,
  ComponentTypes,
  DefaultMessageNotifications,
  EmbedTypes,
  EntityTypes,
  EventStatus,
  ExplicitContentFilter,
  ForumLayoutTypes,
  GuildFeatures,
  GuildMemberFlags,
  InteractionCallbackTypes,
  InteractionTypes,
  InviteTargetTypes,
  MFALevel,
  MessageActivityTypes,
  MessageFlags,
  MessageTypes,
  NSFWLevel,
  NitroTypes,
  OverwriteTypes,
  PrivacyLevels,
  ServerBoostLevel,
  SortOrderTypes,
  StickerFormatTypes,
  StickerTypes,
  SystemChannelFlags,
  TextInputStyles,
  UserFlags,
  VerificationLevel,
  VideoQualityModes,
} from "./enums";

/* eslint-disable no-use-before-define */

export interface RawThreadCreateFromMessage {
  name: string;
  auto_archive_duration?: number;
  rate_limit_per_user?: number;
}

export type RawThreadCreateWithoutMessage = RawThreadCreateFromMessage & {
  type?: ChannelTypes.PUBLIC_THREAD | ChannelTypes.PRIVATE_THREAD;
  invitable?: boolean;
};

export interface RawInviteCreate {
  max_age?: number;
  max_uses?: number;
  temporary?: boolean;
  unique?: boolean;
  target_type?: InviteTargetTypes;
  target_user_id?: string;
  target_application_id?: string;
}

export type RawInviteMetadata = RawInvite & {
  uses: number;
  max_uses: number;
  max_age: number;
  temporary: boolean;
  created_at: string;
};

export interface RawInvite {
  code: string;
  guild?: RawGuild;
  channel?: RawChannel;
  inviter?: RawUser;
  target_type?: InviteTargetTypes;
  approximate_presence_count?: number;
  approximate_member_count?: number;
  expires_at?: string;
  guild_scheduled_event?: RawGuildScheduledEvent;
}

export interface RawGuildScheduledEvent {
  id: string;
  guild_id: string;
  channel_id?: string;
  creator_id?: string;
  name: string;
  description?: string;
  scheduled_start_time: string;
  scheduled_end_time?: string;
  privacy_level: PrivacyLevels;
  status: EventStatus;
  entity_type: EntityTypes;
  entity_id?: string;
  entity_metadata?: RawEntityMetadata;
  creator?: RawUser;
  user_count?: number;
  image?: string;
}

export interface RawEntityMetadata {
  location?: string;
}

export interface RawModifyChannelJSON {
  name?: string;
  type?: ChannelTypes;
  position?: number;
  topic?: string;
  nsfw?: boolean;
  rate_limit_per_user?: number;
  bitrate?: number;
  user_limit?: number;
  permission_overwrites?: RawOverwrite[];
  parent_id?: string;
  rtc_region?: string;
  video_quality_mode?: VideoQualityModes;
  default_auto_archive_duration?: number;
  flags?: ChannelFlags;
  available_tags?: RawForumTag[];
  default_reaction_emoji?: RawDefaultReaction;
  default_thread_rate_limit_per_user?: number;
  default_sort_order?: SortOrderTypes;
  default_forum_layout?: ForumLayoutTypes;
}

export interface RawActionRow {
  type: ComponentTypes.ActionRow;
  components: (RawButton | RawSelectMenu | RawTextInput)[];
}

export interface RawTextInput {
  type: ComponentTypes.TextInput;
  custom_id: string;
  style: TextInputStyles;
  label: string;
  min_length?: number;
  max_length?: number;
  required?: boolean;
  value?: string;
  placeholder?: string;
}

export interface RawSelectMenu {
  type:
    | ComponentTypes.StringSelect
    | ComponentTypes.ChannelSelect
    | ComponentTypes.MentionableSelect
    | ComponentTypes.UserSelect
    | ComponentTypes.RoleSelect;
  custom_id: string;
  options?: RawSelectOption[];
  channel_types?: ChannelTypes[];
  placeholder?: string;
  min_values?: number;
  max_values?: number;
  disabled?: boolean;
}

export interface RawSelectOption {
  label: string;
  value: string;
  description?: string;
  emoji?: RawEmoji;
  default?: boolean;
}

export interface RawButton {
  type: ComponentTypes.Button;
  style: ButtonStyle;
  label?: string;
  emoji?: RawEmoji;
  custom_id: string;
  url?: string;
  disabled?: boolean;
}

export interface RawMessage {
  id: string;
  channel_id: string;
  author: RawUser;
  member?: RawGuildMember;
  content: string;
  timestamp: string;
  edited_timestamp?: string;
  tts: boolean;
  mention_everyone: boolean;
  mentions?: RawUser[];
  mention_roles?: string[];
  mention_channels?: RawChannelMention[];
  attachments: RawAttachment[];
  embeds: RawEmbed[];
  reactions?: RawReaction[];
  nonce?: string | number;
  pinned: boolean;
  webhook_id?: string;
  type: MessageTypes;
  activity?: RawMessageActivity;
  message_reference?: RawMessageReference;
  flags?: MessageFlags;
  referenced_message?: RawMessage;
  interaction?: RawMessageInteraction;
  thread?: RawChannel;
  components?: RawActionRow[];
  sticker_items?: RawSticker[];
  position?: number;
  role_subscription_data?: RawRoleSubscriptionData;
}

export interface RawMessageCreate {
  content?: string;
  tts?: boolean;
  embeds?: RawEmbed[];
  allowed_mentions?: RawAllowedMention;
  message_reference?: RawMessageReference;
  components?: RawActionRow[];
  sticker_ids?: string[];
  attachments?: Partial<RawAttachment>[];
  flags?: MessageFlags;
}

export interface RawAllowedMention {
  parse: AllowedMentionTypes[];
  roles: string[];
  users: string[];
  replied_user: boolean;
}

export interface RawMessageActivity {
  type: MessageActivityTypes;
  party_id?: string;
}

export interface RawRoleSubscriptionData {
  role_subscription_listing_id: string;
  tier_name: string;
  total_months_subscribed: string;
  is_renewal: string;
}

export interface RawMessageInteraction {
  id: string;
  type: InteractionTypes;
  name: string;
  user: RawUser;
  member?: RawGuildMember;
}

export interface RawMessageReference {
  message_id?: string;
  channel_id?: string;
  guild_id?: string;
  fail_if_not_exists?: boolean;
}

export interface RawReaction {
  count: string;
  me: boolean;
  emoji: RawEmoji;
}

export interface RawEmbed {
  title?: string;
  type?: EmbedTypes;
  description?: string;
  url?: string;
  color?: number;
  footer?: RawEmbedFooter;
  image?: RawEmbedImage;
  thumbnail?: RawEmbedThumbnail;
  video?: RawEmbedVideo;
  provider?: RawEmbedProvider;
  author?: RawEmbedAuthor;
  fields?: RawEmbedField[];
  timestamp?: string;
}

interface BaseThing {
  proxy_url?: string;
  height?: number;
  width?: number;
}

export interface RawEmbedThumbnail extends BaseThing {
  url: string;
}

export interface RawEmbedVideo extends BaseThing {
  url?: string;
}

export interface RawEmbedImage extends BaseThing {
  url: string;
}

export interface RawEmbedProvider {
  name?: string;
  url?: string;
}

export interface RawEmbedAuthor {
  name: string;
  url?: string;
  icon_url?: string;
  proxy_icon_url?: string;
}

export interface RawEmbedFooter {
  text: string;
  icon_url?: string;
  proxy_icon_url?: string;
}

export interface RawEmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

export interface RawChannelMention {
  id: string;
  guild_id: string;
  type: ChannelTypes;
  name: string;
}

export interface RawInteraction {
  id: string;
  application_id: string;
  type: InteractionTypes;
  data?:
    | RawInteractionApplicationCommandData
    | RawInteractionMessageComponentData
    | RawInteractionModalSubmitData;
  guild_id?: string;
  channel_id?: string;
  member?: RawGuildMember;
  user?: RawUser;
  token: string;
  readonly version: number;
  message?: RawMessage;
  locale?: string;
  guild_locale?: string;
}

export interface RawInteractionApplicationCommandData {
  id: string;
  name: string;
  type: CommandTypes;
  resolved?: RawInteractionResolvedData;
  options?: RawInteractionCommandDataOption[];
  guild_id?: string;
  target_id?: string;
}

export interface RawInteractionMessageComponentData {
  custom_id: string;
  component_type: ComponentTypes;
  values?: (RawSelectOption | string)[];
}

export interface RawInteractionModalSubmitData {
  custom_id: string;
  components: RawActionRow[];
}

export interface RawInteractionCommandDataOption {
  name: string;
  type: CommandOptionTypes;
  value?: string | number;
  options?: RawInteractionCommandDataOption[];
  focused?: boolean;
}

export interface RawInteractionResolvedData {
  users?: { [id: string]: RawUser };
  messages?: { [id: string]: RawMessage };
  members?: { [id: string]: Omit<RawGuildMember, "user" | "deaf" | "mute"> };
  channels?: { [id: string]: RawChannel };
  roles?: { [id: string]: RawRole };
  attachments?: { [id: string]: RawAttachment };
}

export interface RawInteractionCallback {
  type: InteractionCallbackTypes;
  data?:
    | RawInteractionMessageCallback
    | RawInteractionAutoCompleteCallback
    | RawInteractionModalCallback;
}

export type RawInteractionMessageCallback = Omit<
  RawMessageCreate,
  "sticker_ids" | "message_reference"
>;

export interface RawInteractionAutoCompleteCallback {
  choices: RawApplicationCommandOptionChoice[];
}

export interface RawInteractionModalCallback {
  custom_id: string;
  title: string;
  components: RawActionRow[];
}

export interface RawAttachment {
  id: string;
  filename: string;
  description?: string;
  content_type?: string;
  size: number;
  url: string;
  proxy_url: string;
  height?: number;
  width?: number;
  ephemeral?: boolean;
  duration_secs?: number;
  waveform?: string;
}

export interface RawApplicationCommand {
  id: string;
  type: CommandTypes;
  application_id: string;
  guild_id?: string;
  name: string;
  name_localizations?: Record<string, string>;
  description?: string;
  description_localizations?: Record<string, string>;
  options?: RawApplicationCommandOption[];
  default_member_permissions?: string;
  dm_permission?: boolean;
  nsfw?: boolean;
  version: string;
}

export type RawApplicationCommandCreate = Omit<
  RawApplicationCommand,
  "id" | "application_id" | "version"
>;

export interface RawApplicationCommandOption {
  type: CommandOptionTypes;
  name: string;
  name_localizations?: Record<string, string>;
  description: string;
  description_localizations?: Record<string, string>;
  required?: boolean;
  choices?: RawApplicationCommandOptionChoice[];
  options?: RawApplicationCommandOption[];
  channel_types?: ChannelTypes[];
  min_value?: number;
  max_value?: number;
  min_length?: number;
  max_length?: number;
  autocomplete?: boolean;
}

export interface RawApplicationCommandOptionChoice {
  name: string;
  name_localizations?: Record<string, string>;
  value: string | number;
}

export interface RawGatewayBot {
  url: string;
  shards: number;
  session_start_limit: RawSessionStartLimit;
}

interface RawSessionStartLimit {
  total: number;
  remaining: number;
  reset_after: number;
  max_concurrency: number;
}

export interface RawUnavailableGuild {
  id: string;
  unavailable: boolean;
}

export interface RawGuild {
  id: string;
  name: string;
  icon?: string;
  icon_hash?: string;
  splash?: string;
  discovery_splash?: string;
  owner?: boolean;
  owner_id: string;
  permissions?: string;
  afk_channel_id?: string;
  afk_timeout: number;
  widget_enabled?: boolean;
  widget_channel_id?: string;
  verification_level: VerificationLevel;
  default_message_notifications: DefaultMessageNotifications;
  explicit_content_filter: ExplicitContentFilter;
  roles: RawRole[];
  emojis: RawEmoji[];
  features?: GuildFeatures[];
  mfa_level: MFALevel;
  application_id?: string;
  system_channel_id?: string;
  system_channel_flags: SystemChannelFlags;
  rules_channel_id?: string;
  max_members?: number;
  vanity_url_code?: string;
  description?: string;
  banner?: string;
  premium_tier: ServerBoostLevel;
  premium_subscription_count?: number;
  preferred_locale?: string;
  public_updates_channel_id?: string;
  nsfw_level: NSFWLevel;
  stickers?: RawSticker[];
  premium_progress_bar_enabled: boolean;
  channels?: RawChannel[];
  members?: RawGuildMember[];
  threads?: RawChannel[];
}

export interface RawRole {
  id: string;
  name: string;
  color: number;
  hoist: boolean;
  icon?: string;
  unicode_emoji?: string;
  position: number;
  permissions: string;
  managed: boolean;
  mentionable: boolean;
}

export interface RawEmoji {
  id?: string;
  name?: string;
  roles?: string[];
  user?: RawUser;
  require_colons?: boolean;
  managed?: boolean;
  animated?: boolean;
  available?: boolean;
}

export interface RawUser {
  id: string;
  username: string;
  avatar?: string;
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
  banner?: string;
  accent_color?: number;
  locale?: string;
  verified?: boolean;
  email?: string;
  flags?: UserFlags;
  premium_type?: NitroTypes;
  public_flags?: UserFlags;
}

export interface RawSticker {
  id: string;
  pack_id?: string;
  name: string;
  description?: string;
  tags: string;
  type: StickerTypes;
  format_type: StickerFormatTypes;
  available?: boolean;
  guild_id?: string;
  user?: RawUser;
  sort_value?: number;
}

export interface RawGuildMember {
  user?: RawUser;
  nick?: string;
  avatar?: string;
  roles?: string[];
  joined_at: string;
  premium_since?: string;
  deaf: boolean;
  mute: boolean;
  flags: GuildMemberFlags;
  pending?: boolean;
  permissions?: string;
  communication_disabled_until?: string;
}

export interface RawChannel {
  id: string;
  type: ChannelTypes;
  guild_id?: string;
  position?: number;
  permission_overwrites?: RawOverwrite[];
  name?: string;
  topic?: string;
  nsfw?: boolean;
  last_message_id?: string;
  bitrate?: number;
  user_limit?: number;
  rate_limit_per_user?: number;
  recipients?: RawUser[];
  icon?: string;
  owner_id?: string;
  parent_id?: string;
  last_pin_timestamp?: string;
  rtc_region?: string;
  video_quality_mode?: VideoQualityModes;
  message_count?: number;
  member_count?: number;
  thread_metadata?: RawTreadMetadata;
  member?: RawThreadMember;
  default_auto_archive_duration?: number;
  permissions?: string;
  flags?: ChannelFlags;
  total_message_sent?: number;
  available_tags?: RawForumTag[];
  applied_tags?: string[];
  default_reaction_emoji?: RawDefaultReaction;
  default_thread_rate_limit_per_user?: number;
  default_sort_order?: SortOrderTypes;
  default_forum_layout?: ForumLayoutTypes;
}

export interface RawOverwrite {
  id: string;
  type: OverwriteTypes;
  allow: string;
  deny: string;
}

export interface RawTreadMetadata {
  archived: string;
  auto_archive_duration: string;
  archive_timestamp: string;
  locked: boolean;
  invitable?: boolean;
  create_timestamp?: string;
}

export interface RawThreadMember {
  id?: string;
  user_id?: string;
  join_timestamp: string;
  flags: number;
  member: RawGuildMember;
}

export interface RawForumTag {
  id: string;
  name: string;
  moderated: boolean;
  emoji_id?: string;
  emoji_name?: string;
}

export interface RawDefaultReaction {
  emoji_id?: string;
  emoij_name?: string;
}
