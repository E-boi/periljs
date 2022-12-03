/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ComponentOptions, Components } from './Component';
import { Embed, EmbedOptions } from './Embed';
import { Emoji } from './Emoji';
import { Guild } from './Guild';
import HTTPS from './HTTPS';
import { Attachment, Message, MessageReference } from './Message';
import { Permission } from './Permission';
import {
  RawAllowedMentions,
  ChannelTypes,
  RawChannel,
  TextableChannelTypes,
  VideoQualityModes,
  MessageFlags,
  RawForumTag,
  SortOrderTypes,
} from './RawTypes';
import { User } from './User';

/** @internal */
export function createChannel(channel: RawChannel, request: HTTPS) {
  switch (channel.type) {
    case ChannelTypes.GUILD_TEXT:
      return new TextChannel(channel, request);

    case ChannelTypes.GUILD_PRIVATE_THREAD:
    case ChannelTypes.GUILD_PUBLIC_THREAD:
      return new ThreadChannel(channel, request);

    case ChannelTypes.GUILD_CATEGORY:
      return new Category(channel, request);

    case ChannelTypes.GUILD_NEWS:
      return new NewsChannel(channel, request);

    case ChannelTypes.GUILD_VOICE:
      return new VoiceChannel(channel, request);

    case ChannelTypes.DM:
      return new DMChannel(channel, request);

    case ChannelTypes.GUILD_FORUM:
      return new ForumChannel(channel, request);
  }
}

/**
 * @category Channels
 */
export class PartailChannel {
  id: string;
  name?: string;
  type: keyof typeof ChannelTypes;
  overwrites?: Permission[];
  messages: Map<string, Message> = new Map();

  constructor(channel: RawChannel) {
    this.id = channel.id;
    this.name = channel.name;
    this.type = ChannelTypes[channel.type] as keyof typeof ChannelTypes;
    this.overwrites = channel.permission_overwrites?.map(
      perm => new Permission(perm.allow, perm.id)
    );
  }

  isTextChannel(): this is TextChannel {
    return this.type === 'GUILD_TEXT';
  }

  isNewsChannel(): this is NewsChannel {
    return this.type === 'GUILD_NEWS';
  }

  isDM(): this is DMChannel {
    return this.type === 'DM';
  }

  isVoice(): this is VoiceChannel {
    return this.type === 'GUILD_VOICE';
  }

  isCategory(): this is Category {
    return this.type === 'GUILD_CATEGORY';
  }

  isThread(): this is ThreadChannel {
    return (
      this.type === 'GUILD_PUBLIC_THREAD' ||
      this.type === 'GUILD_PRIVATE_THREAD'
    );
  }

  inGuild(): this is
    | ThreadChannel
    | TextChannel
    | VoiceChannel
    | Category
    | ForumChannel {
    return 'guild' in this;
  }

  isTextable(): this is BaseTextableChannel {
    return this instanceof BaseTextableChannel;
  }

  isForum(): this is ForumChannel {
    return this.type === 'GUILD_FORUM';
  }
}

/**
 * @category Channels
 */
export class BaseTextableChannel extends PartailChannel {
  type: keyof typeof TextableChannelTypes;
  lastPinTimestamp?: Date;
  lastMessageId?: string;
  protected request: HTTPS;

  constructor(channel: RawChannel, request: HTTPS) {
    super(channel);
    this.type = TextableChannelTypes[
      channel.type
    ] as unknown as keyof typeof TextableChannelTypes;
    this.lastPinTimestamp =
      (channel.last_pin_timestamp && new Date(channel.last_pin_timestamp)) ||
      undefined;
    this.lastMessageId = channel.last_message_id;
    this.request = request;
  }

  async sendMessage(message: MessageOptions | string): Promise<Message> {
    const sentMessage = await this.request.createMessage(
      this.id,
      Message.create(message)
    );

    return new Message(sentMessage, this.request);
  }

  async fetchMessage(messageId: string): Promise<Message> {
    const message = await this.request.getMessage(this.id, messageId);

    return new Message(message, this.request);
  }

  async fetchMessages(limit = 50): Promise<Message[]> {
    const messages = await this.request.getMessages(this.id, { limit });

    return messages.map(message => new Message(message, this.request));
  }

  deleteMessage(id: string) {
    return this.request.deleteMessage(this.id, id);
  }

  startTyping() {
    return this.request.triggerTyping(this.id);
  }

  async fetchPins(): Promise<Message[]> {
    const messages = await this.request.getPinMessage(this.id);

    return messages.map(message => new Message(message, this.request));
  }

  toString(): string {
    return `<#${this.id}>`;
  }
}

/**
 * @category Channels
 */
export class TextChannel extends BaseTextableChannel {
  guildId: string;
  position: number;
  nsfw: boolean;
  rateLimit: number;
  permissionOverwrites: Permission[];
  parentId?: string;
  topic?: string;

  constructor(channel: RawChannel, request: HTTPS) {
    super(channel, request);
    this.guildId = channel.guild_id!;
    this.position = channel.position!;
    this.nsfw = channel.nsfw!;
    this.rateLimit = channel.rate_limit_per_user!;
    this.permissionOverwrites = channel.permission_overwrites!.map(
      p => new Permission(p.allow, p.id)
    );
  }

  get guild(): Guild | undefined {
    return this.request.client.guilds.get(this.guildId);
  }

  async createThread(name: string, messgaeId?: string): Promise<ThreadChannel> {
    let channel: RawChannel;
    if (messgaeId)
      channel = await this.request.startThreadFromMessage(
        this.id,
        messgaeId,
        name
      );
    else channel = await this.request.startThreadWithoutMessage(this.id, name);

    return new ThreadChannel(channel, this.request);
  }
  // fetchActiveThreads() {}
}

class NewsChannel extends TextChannel {
  async crosspost(messageId: string): Promise<Message> {
    const message = await this.request.crosspostMessage(this.id, messageId);

    return new Message(message, this.request);
  }
}

/**
 * @category Channels
 */
export class ThreadChannel extends BaseTextableChannel {
  memberCount: number;
  messageCount: number;
  threadMetadata: TreadMetadata;
  parentId: string;
  guildId: string;
  rateLimit: number;

  constructor(channel: RawChannel, request: HTTPS) {
    super(channel, request);
    this.memberCount = channel.member_count!;
    this.messageCount = channel.message_count!;
    this.parentId = channel.parent_id!;
    this.guildId = channel.guild_id!;
    this.rateLimit = channel.rate_limit_per_user!;
    this.threadMetadata = {
      achived: channel.thread_metadata!.achived,
      archiveTimestamp: channel.thread_metadata!.archive_timestamp,
      autoArchiveDuration: channel.thread_metadata!.auto_archive_duration,
      locked: channel.thread_metadata!.locked,
      createdTimestamp: channel.thread_metadata!.create_timestamp,
      invitable: channel.thread_metadata!.invitable,
    };
  }

  get guild(): Guild | undefined {
    return this.request.client.guilds.get(this.guildId);
  }

  get parent(): TextChannel | undefined {
    return this.guild?.channels.get(this.parentId) as TextChannel;
  }

  addMember(memberId: string) {
    return this.request.addThreadMember(this.id, memberId);
  }

  removeMember(memberId: string) {
    return this.request.removeThreadMember(this.id, memberId);
  }

  async fetchMembers(): Promise<ThreadMember[]> {
    const rawMembers = await this.request.listThreadMembers(this.id);

    return rawMembers.map(member => ({
      flags: member.flags,
      joinTimestamp: new Date(member.join_timestamp),
      id: this.id,
      userId: member.user_id,
    }));
  }

  join() {
    return this.request.joinThread(this.id);
  }
}

/**
 * @category Channels
 */
export class DMChannel extends BaseTextableChannel {
  recipients: Map<string, User> = new Map();

  constructor(channel: RawChannel, request: HTTPS) {
    super(channel, request);
    channel.recipients!.map(user =>
      this.recipients.set(user.id, new User(user))
    );
  }
}

/**
 * @category Channels
 */
export class Category extends PartailChannel {
  type: 'GUILD_CATEGORY' = 'GUILD_CATEGORY';
  guildId: string;
  position: number;

  constructor(channel: RawChannel, private request: HTTPS) {
    super(channel);
    this.guildId = channel.guild_id!;
    this.position = channel.position!;
  }

  get guild(): Guild | undefined {
    return this.request.client.guilds.get(this.guildId);
  }
}

/**
 * @category Channels
 */
export class VoiceChannel extends PartailChannel {
  type: 'GUILD_VOICE' = 'GUILD_VOICE';
  guildId: string;
  position: number;
  maxUsers: number;
  bitrate: number;
  permissionOverwrites: Permission[];
  rtcRegion?: string;
  parentId?: string;
  videoQualityMode?: keyof typeof VideoQualityModes;

  constructor(channel: RawChannel, private request: HTTPS) {
    super(channel);
    this.guildId = channel.guild_id!;
    this.position = channel.position!;
    this.maxUsers = channel.user_limit!;
    this.bitrate = channel.bitrate!;
    this.permissionOverwrites = channel.permission_overwrites!.map(
      perm => new Permission(perm.allow, perm.id)
    );
    this.rtcRegion = channel.rtc_region!;
    this.parentId = channel.parent_id;
    this.videoQualityMode =
      (channel.video_quality_mode &&
        (VideoQualityModes[
          channel.video_quality_mode
        ] as keyof typeof VideoQualityModes)) ||
      undefined;
  }

  get guild(): Guild | undefined {
    return this.request.client.guilds.get(this.guildId);
  }

  toString() {
    return `<#${this.id}>`;
  }
}

export class ForumChannel extends PartailChannel {
  type: 'GUILD_FORUM' = 'GUILD_FORUM';
  guildId: string;
  availableTags: FourmTag[];
  defaultReactionEmoji?: Emoji;
  rateLimit: number;
  defaultThreadRateLimit: number;
  defaultSortOrder: keyof typeof SortOrderTypes;

  constructor(channel: RawChannel, private request: HTTPS) {
    super(channel);
    console.log(channel);
    this.guildId = channel.guild_id!;
    this.availableTags = channel.available_tags!.map(tag => new FourmTag(tag));
    this.defaultReactionEmoji =
      channel.default_reaction_emoji &&
      new Emoji({
        name: channel.default_reaction_emoji.emoij_name!,
        id: channel.default_reaction_emoji.emoji_id,
      });
    this.rateLimit = channel.rate_limit_per_user ?? 0;
    this.defaultThreadRateLimit =
      channel.default_thread_rate_limit_per_user ?? 0;
    this.defaultSortOrder = SortOrderTypes[
      channel.default_sort_order ?? 0
    ] as keyof typeof SortOrderTypes;
  }

  get guild(): Guild | undefined {
    return this.request.client.guilds.get(this.guildId);
  }

  async createPost(post: { name: string; message: MessageOptions | string }) {
    const rawThread = await this.request.startThreadInForum(this.id, {
      name: post.name,
      message: Message.create(post.message),
    });

    return new ThreadChannel(rawThread, this.request);
  }
}

class FourmTag {
  id: string;
  name: string;
  moderated?: boolean;
  emojiId?: string;
  emojiName?: string;

  constructor(tag: RawForumTag) {
    this.id = tag.id;
    this.name = tag.name;
    this.moderated = tag.moderated;
    this.emojiId = tag.emoji_id;
    this.emojiName = tag.emoji_name;
  }
}

export interface ThreadMember {
  userId?: string;
  id?: string;
  joinTimestamp: Date;
  flags: number;
}

export interface TreadMetadata {
  achived: string;
  autoArchiveDuration: string;
  archiveTimestamp: string;
  locked: boolean;
  invitable?: boolean;
  createdTimestamp?: string;
}

export interface MessageOptions {
  content?: string;
  tts?: boolean;
  embeds?: Embed[] | EmbedOptions[];
  allowedMentions?: RawAllowedMentions;
  components?: Components | ComponentOptions[];
  stickerIds?: string[];
  messageReference?: MessageReference;
  attachments?: Attachment[];
  flags?: (keyof typeof MessageFlags)[];
}
