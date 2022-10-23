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

export interface RawEmbed {
  title?: string;
  type?: EmbedType;
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

// idk wat to name suggestions open
/** @hidden */
interface BaseThing {
  proxy_url?: string;
  height?: number;
  width?: number;
}

export enum EmbedType {
  rich = 'rich',
  image = 'image',
  video = 'video',
  gifv = 'gifv',
  article = 'article',
  link = 'link',
}

export interface RawSticker {
  id: string;
  pack_id?: string;
  name: string;
  description?: string;
  tags: string;
  asset?: string;
  type: StickerTypes;
  format_type: StickerFormatTypes;
  available?: boolean;
  guild_id?: string;
  user?: RawUser;
  sort_value?: number;
}

export interface RawPartialSticker {
  id: string;
  name: string;
  format_type: StickerFormatTypes;
}

export enum StickerTypes {
  STANDARD = 1,
  GUILD = 2,
}

export enum StickerFormatTypes {
  PNG = 1,
  APNG = 2,
  LOTTIE = 3,
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
  members?: RawMember[];
  threads?: RawChannel[];
}

export enum VerificationLevel {
  NONE = 0,
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
  VERY_HIGH = 4,
}

export enum DefaultMessageNotifications {
  ALL_MESSAGES = 0,
  ONLY_MENTIONS = 1,
}

export enum ExplicitContentFilter {
  DISABLED = 0,
  MEMBERS_WITHOUT_ROLES = 1,
  ALL_MEMBERS = 2,
}

export enum MFALevel {
  NONE = 0,
  ELEVATED = 1,
}

export enum NSFWLevel {
  DEFAULT = 0,
  EXPLICIT = 1,
  SAFE = 2,
  AGE_RESTRICTED = 3,
}

export enum ServerBoostLevel {
  NONE = 0,
  TIER_1 = 1,
  TIER_2 = 2,
  TIER_3 = 3,
}

export enum SystemChannelFlags {
  SUPPRESS_JOIN_NOTIFICATIONS = 1 << 0,
  SUPPRESS_PREMIUM_SUBSCRIPTIONS = 1 << 1,
  SUPPRESS_GUILD_REMINDER_NOTIFICATIONS = 1 << 2,
  SUPPRESS_JOIN_NOTIFICATION_REPLIES = 1 << 3,
}

export enum GuildFeatures {
  ANIMATED_ICON = 'ANIMATED_ICON',
  BANNER = 'BANNER',
  COMMERCE = 'COMMERCE',
  COMMUNITY = 'COMMUNITY',
  DISCOVERABLE = 'DISCOVERABLE',
  FEATURABLE = 'FEATURABLE',
  INVITE_SPLASH = 'INVITE_SPLASH',
  MEMBER_VERIFICATION_GATE_ENABLED = 'MEMBER_VERIFICATION_GATE_ENABLED',
  NEWS = 'NEWS',
  PARTNERED = 'PARTNERED',
  PREVIEW_ENABLED = 'PREVIEW_ENABLED',
  VANITY_URL = 'VANITY_URL',
  VERIFIED = 'VERIFIED',
  VIP_REGIONS = 'VIP_REGIONS',
  WELCOME_SCREEN_ENABLED = 'WELCOME_SCREEN_ENABLED',
  TICKETED_EVENTS_ENABLED = 'TICKETED_EVENTS_ENABLED',
  MONETIZATION_ENABLED = 'MONETIZATION_ENABLED',
  MORE_STICKERS = 'MORE_STICKERS',
  THREE_DAY_THREAD_ARCHIVE = 'THREE_DAY_THREAD_ARCHIVE',
  SEVEN_DAY_THREAD_ARCHIVE = 'SEVEN_DAY_THREAD_ARCHIVE',
  PRIVATE_THREADS = 'PRIVATE_THREADS',
}

export interface RawEmoji {
  id?: string;
  name: string;
  roles?: string[];
  user?: RawUser;
  require_colons?: boolean;
  managed?: boolean;
  animated?: boolean;
  available?: boolean;
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
  permission?: string;
  flags?: ChannelFlags;
}

export interface RawChannelMention {
  id: string;
  guild_id: string;
  type: ChannelTypes;
  name: string;
}

export interface RawThreadMember {
  id?: string;
  user_id?: string;
  join_timestamp: string;
  flags: number;
}

export interface RawTreadMetadata {
  achived: string;
  auto_archive_duration: string;
  archive_timestamp: string;
  locked: boolean;
  invitable?: boolean;
  create_timestamp?: string;
}

export interface RawOverwrite {
  id: string;
  type: OverwriteType;
  allow: string;
  deny: string;
}

export enum ChannelTypes {
  GUILD_TEXT,
  DM,
  GUILD_VOICE,
  GROUP_DM,
  GUILD_CATEGORY,
  GUILD_NEWS,
  GUILD_NEWS_THREAD = 10,
  GUILD_PUBLIC_THREAD,
  GUILD_PRIVATE_THREAD,
  GUILD_STAGE_VOICE,
  GUILD_DIRECTORY,
  GUILD_FORUM,
}

export enum TextableChannelTypes {
  GUILD_TEXT = ChannelTypes.GUILD_TEXT,
  DM = ChannelTypes.DM,
  GROUP_DM = ChannelTypes.GROUP_DM,
  GUILD_PUBLIC_THREAD = ChannelTypes.GUILD_PUBLIC_THREAD,
  GUILD_PRIVATE_THREAD = ChannelTypes.GUILD_PRIVATE_THREAD,
  GUILD_NEWS = ChannelTypes.GUILD_NEWS,
}

export enum OverwriteType {
  ROLE,
  MEMBER,
}

export enum ChannelFlags {
  PINNED = 1 << 1,
}

export enum VideoQualityModes {
  AUTO,
  FULL,
}

export enum Permissions {
  CREATE_INSTANT_INVITE = 1 << 0,
  KICK_MEMBERS = 1 << 1,
  BAN_MEMBERS = 1 << 2,
  ADMINISTRATOR = 1 << 3,
  MANAGE_CHANNELS = 1 << 4,
  MANAGE_GUILD = 1 << 5,
  ADD_REACTIONS = 1 << 6,
  VIEW_AUDIT_LOG = 1 << 7,
  PRIORITY_SPEAKER = 1 << 8,
  STREAM = 1 << 9,
  VIEW_CHANNEL = 1 << 10,
  SEND_MESSAGES = 1 << 11,
  SEND_TTS_MESSAGES = 1 << 12,
  MANAGE_MESSAGES = 1 << 13,
  EMBED_LINKS = 1 << 14,
  ATTACH_FILES = 1 << 15,
  READ_MESSAGE_HISTORY = 1 << 16,
  MENTION_EVERYONE = 1 << 17,
  USE_EXTERNAL_EMOJIS = 1 << 18,
  VIEW_GUILD_INSIGHTS = 1 << 19,
  CONNECT = 1 << 20,
  SPEAK = 1 << 21,
  MUTE_MEMBERS = 1 << 22,
  DEAFEN_MEMBERS = 1 << 23,
  MOVE_MEMBERS = 1 << 24,
  USE_VAD = 1 << 25,
  CHANGE_NICKNAME = 1 << 26,
  MANAGE_NICKNAMES = 1 << 27,
  MANAGE_ROLES = 1 << 28,
  MANAGE_WEBHOOKS = 1 << 29,
  MANAGE_EMOJIS_AND_STICKERS = 1 << 30,
  USE_SLASH_COMMANDS = 1 << 31,
  REQUEST_TO_SPEAK = 1 << 32,
  MANAGE_THREADS = 1 << 34,
  USE_PUBLIC_THREADS = 1 << 35,
  USE_PRIVATE_THREADS = 1 << 36,
  USE_EXTERNAL_STICKERS = 1 << 37,
  SEND_MESSAGES_IN_THREAD = 1 << 38,
  USE_EMBEDDED_ACTIVITIES = 1 << 39,
  MODERATE_MEMBERS = 1 << 40,
}

export interface RawUser {
  id: string;
  username: string;
  discriminator: string;
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

export interface RawMember {
  user?: RawUser;
  nick?: string;
  avatar?: string;
  roles?: string[];
  premium_since?: string;
  deaf: boolean;
  mute: boolean;
  pending?: boolean;
  permissions?: string;
  communication_disabled_until?: string;
}

export enum UserFlags {
  STAFF = 1 << 0,
  PARTNER = 1 << 1,
  HYPESQUAD = 1 << 2,
  BUG_HUNTER_LEVEL_1 = 1 << 3,
  HYPESQUAD_ONLINE_HOUSE_1 = 1 << 6,
  HYPESQUAD_ONLINE_HOUSE_2 = 1 << 7,
  HYPESQUAD_ONLINE_HOUSE_3 = 1 << 8,
  PREMIUM_EARLY_SUPPORTER = 1 << 9,
  TEAM_PSEUDO_USER = 1 << 10,
  BUG_HUNTER_LEVEL_2 = 1 << 14,
  VERIFIED_BOT = 1 << 16,
  VERIFIED_DEVELOPER = 1 << 17,
  CERTIFIED_MODERATOR = 1 << 18,
  BOT_HTTP_INTERACTIONS = 1 << 19,
}

export enum NitroTypes {
  None = 0,
  Classic = 1,
  Nitro = 2,
}

export interface RawMessage {
  id: string;
  channel_id: string;
  author?: RawUser;
  member?: RawMember;
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
  message_reference?: RawMessageReference;
  flags?: MessageFlags;
  referenced_message?: RawMessage;
  interaction?: RawMessageInteraction;
  thread?: RawChannel;
  components?: RawMessageComponent[];
  sticker_items?: RawPartialSticker[];
}

export interface RawMessageInteraction {
  id: string;
  type: InteractionType;
  name: string;
  user: RawUser;
  member?: RawMember;
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
}

export enum MessageFlags {
  CROSSPOSTED = 1 << 0,
  IS_CROSSPOST = 1 << 1,
  SUPPRESS_EMBEDS = 1 << 2,
  SOURCE_MESSAGE_DELETED = 1 << 3,
  URGENT = 1 << 4,
  HAS_THREAD = 1 << 5,
  EPHEMERAL = 1 << 6,
  LOADING = 1 << 7,
  FAILED_TO_MENTION_SOME_ROLES_IN_THREAD = 1 << 8,
}

export enum MessageTypes {
  DEFAULT = 0,
  RECIPIENT_ADD,
  RECIPIENT_REMOVE,
  CALL,
  CHANNEL_NAME_CHANGE,
  CHANNEL_ICON_CHANGE,
  CHANNEL_PINNED_MESSAGE,
  GUILD_MEMBER_JOIN,
  USER_PREMIUM_GUILD_SUBSCRIPTION,
  USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1,
  USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2,
  USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3,
  CHANNEL_FOLLOW_ADD,
  GUILD_DISCOVERY_DISQUALIFIED = 14,
  GUILD_DISCOVERY_REQUALIFIED,
  GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING,
  GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING,
  THREAD_CREATED,
  REPLY,
  CHAT_INPUT_COMMAND,
  THREAD_STARTER_MESSAGE,
  GUILD_INVITE_REMINDER,
  CONTEXT_MENU_COMMAND,
}

export enum AllowedMentionTypes {
  ROLE_MENTIONS = 'role',
  USER_MENTIONS = 'user',
  EVERYONE_MENTIONS = 'everyone',
}

export interface RawAllowedMentions {
  parse?: AllowedMentionTypes[];
  roles?: string[];
  users?: string[];
  replied_user?: boolean;
}

export type RawMessageComponent = RawActionRow;

export interface RawActionRow {
  type: ComponentTypes.ActionRow;
  components:
    | (RawButtonComponent | RawSelectMenuComponent | RawTextInputComponent)[];
}

export interface RawButtonComponent {
  type: ComponentTypes.Button;
  style: ButtonStyles;
  custom_id: string;
  label: string;
  emoji?: RawEmoji;
  url?: string;
  disabled?: boolean;
}

export interface RawSelectMenuComponent {
  type: ComponentTypes.SelectMenu;
  custom_id: string;
  options: RawSelectOption[];
  placeholder?: string;
  min_values?: number;
  max_values?: number;
  disabled?: boolean;
}

export interface RawTextInputComponent {
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

export interface RawSelectOption {
  label: string;
  value: string;
  description?: string;
  emoji?: RawEmoji;
  default?: boolean;
}

export interface SelectMenuComponentData extends RawSelectMenuComponent {
  values: string[];
}

export enum ComponentTypes {
  ActionRow = 1,
  Button,
  SelectMenu,
  TextInput,
}

export enum ButtonStyles {
  PRIMARY = 1,
  SECONDARY,
  SUCCESS,
  DANGER,
  LINK,
}

export enum TextInputStyles {
  SHORT = 1,
  PARAGRAPH,
}

/**
 * Types of Interaction
 */
export enum InteractionType {
  PING = 1,
  APPLICATION_COMMAND,
  /** Message Component */
  MESSAGE_COMPONENT,
  /** Autocomplete */
  APPLICATION_COMMAND_AUTOCOMPLETE = 4,
  MODAL_SUBMIT,
}

export interface RawInteraction {
  id: string;
  application_id: string;
  type: InteractionType;
  data?: RawInteractionData;
  guild_id?: string;
  channel_id?: string;
  member?: RawMember;
  user?: RawUser;
  token: string;
  readonly version: number;
  message?: RawMessage;
  locale?: string;
  guild_locale?: string;
}

export interface RawInteractionData {
  id: string;
  name: string;
  type: Commandtype;
  resolved?: RawInteractionResolvedData;
  options?: RawInterationCommandDataOption[];
  components?: RawMessageComponent[];
  custom_id?: string;
  guild_id?: string;
  target_id?: string;
  component_type?: ComponentTypes;
  values?: string[];
}

export interface RawInteractionResolvedData {
  users?: { [id: string]: RawUser };
  messages?: { [id: string]: RawMessage };
  members?: { [id: string]: Omit<RawMember, 'user' | 'deaf' | 'mute'> };
  channels?: { [id: string]: RawChannel };
  roles?: { [id: string]: RawRole };
  attachments?: { [id: string]: RawAttachment };
}

export interface RawInteractionCommand {
  id: string;
  type: Commandtype;
  application_id: string;
  guild_id?: string;
  name: string;
  name_localizations?: { [k: string]: string };
  description?: string;
  description_localizations?: { [k: string]: string };
  options?: RawInterationCommandOption[];
  default_member_permissions?: string;
  dm_permission?: boolean;
  version: number;
}

export interface RawInterationCommandOption {
  type: CommandOptionType;
  name: string;
  name_localizations?: { [k: string]: string };
  description: string;
  description_localizations?: { [k: string]: string };
  required?: boolean;
  choices?: RawInterationCommandOptionChoice[];
  options?: RawInterationCommandOption[];
  channel_types?: ChannelTypes[];
  min_value?: number;
  max_value?: number;
  autocomplete?: boolean;
}

export interface RawInterationCommandDataOption {
  name: string;
  type: CommandOptionType;
  value?: string | number;
  options?: RawInterationCommandDataOption[];
  focused?: boolean;
}

export interface RawInterationCommandOptionChoice {
  name: string;
  name_localizations?: { [k: string]: string };
  value: string | number;
}

export enum Commandtype {
  CHAT_INPUT = 1,
  USER,
  MESSAGE,
}

export enum CommandOptionType {
  SUB_COMMAND = 1,
  SUB_COMMAND_GROUP,
  STRING,
  INTEGER,
  BOOLEAN,
  USER,
  CHANNEL,
  ROLE,
  MENTIONABLE,
  NUMBER,
  ATTACHMENT,
}

export enum InteractionCallbackType {
  PONG = 1,
  CHANNEL_MESSAGE_WITH_SOURCE = 4,
  DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
  DEFERRED_UPDATE_MESSAGE,
  UPDATE_MESSAGE,
  APPLICATION_COMMAND_AUTOCOMPLETE_RESULT,
  MODAL,
}

export interface RawInteractionCallback {
  type: InteractionCallbackType;
  data?: RawInteractionCallbackData;
}

export type RawInteractionCallbackData =
  | RawInteractionCallbackMessageData
  | RawInteractionCallbackModalData
  | RawInteractionCallbackAutocompleteData;

export interface RawInteractionCallbackMessageData {
  tts?: boolean;
  content?: string;
  embeds?: RawEmbed[];
  allowed_mentions?: RawAllowedMentions;
  flags?: MessageFlags;
  components?: RawMessageComponent[];
}

export interface RawInteractionCallbackAutocompleteData {
  choices: RawInterationCommandOptionChoice[];
}

export interface RawInteractionCallbackModalData {
  custom_id: string;
  title: string;
  components?: RawMessageComponent[];
}
