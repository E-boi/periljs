import { Bitfield } from "./bitfield";
import { ActionRow } from "./components";
import { Embed } from "./embed";
import { Emoji } from "./emoji";
import {
  RawAllowedMention as RawAllowedMentions,
  RawAttachment,
  RawChannelMention,
  RawMessage,
  RawMessageCreate as RawMessageOptions,
  RawMessageReference,
  RawReaction,
  RawUser,
} from "./rawTypes";
import { PartialSticker } from "./sticker";
import { ChannelTypes, MessageFlags, MessageTypes } from "./enums";
import User from "./user";

class ChannelMention {
  id: string;
  guildId: string;
  type: ChannelTypes;
  name: string;

  constructor(mention: RawChannelMention) {
    this.id = mention.id;
    this.guildId = mention.guild_id;
    this.type = mention.type;
    this.name = mention.name;
  }
}

export class Mentions {
  users: Map<string, User> = new Map();
  channels: Map<string, ChannelMention> = new Map();
  /** @todo map to role objects */
  roles: Map<string, string> = new Map();

  constructor(
    users?: RawUser[],
    channels?: RawChannelMention[],
    roles?: string[],
    public everyone: boolean = false
  ) {
    users?.map((user) => this.users.set(user.id, new User(user)));
    channels?.map((channel) =>
      this.channels.set(channel.id, {
        guildId: channel.guild_id,
        id: channel.id,
        name: channel.name,
        type: channel.type,
      })
    );
    roles?.map((role) => this.roles.set(role, role));
  }

  has(id: string): boolean {
    return this.users.has(id) ?? this.channels.has(id) ?? this.roles.has(id);
  }
}

class MessageReference {
  messageId?: string;
  channelId?: string;
  guildId?: string;

  constructor(reference: RawMessageReference) {
    this.messageId = reference.message_id;
    this.channelId = reference.channel_id;
    this.guildId = reference.guild_id;
  }

  fetch() {
    throw new Error("Method not implemented.");
  }

  toJson(): RawMessageReference {
    return {
      channel_id: this.channelId,
      guild_id: this.guildId,
      message_id: this.messageId,
    };
  }
}

export class Attachment {
  id: string;
  filename: string;
  description?: string;
  contentType?: string;
  size: number;
  url: string;
  proxyUrl: string;
  height?: number;
  width?: number;
  ephemeral?: boolean;

  constructor(attachment: RawAttachment) {
    this.id = attachment.id;
    this.filename = attachment.filename;
    this.description = attachment.description;
    this.contentType = attachment.content_type;
    this.size = attachment.size;
    this.url = attachment.url;
    this.proxyUrl = attachment.proxy_url;
    this.height = attachment.height;
    this.width = attachment.width;
    this.ephemeral = attachment.ephemeral;
  }

  toJson(): RawAttachment {
    return {
      id: this.id,
      filename: this.filename,
      description: this.description,
      content_type: this.contentType,
      size: this.size,
      url: this.url,
      proxy_url: this.proxyUrl,
      height: this.height,
      width: this.width,
      ephemeral: this.ephemeral,
    };
  }
}

export class Reaction {
  count: number;
  me: boolean;
  emoji: Emoji;

  constructor(reaction: RawReaction) {
    this.count = parseInt(reaction.count, 10);
    this.me = reaction.me;
    this.emoji = new Emoji(reaction.emoji);
  }
}

export interface MessageReaction {
  emoji: Emoji;
  userId: string;
  // eslint-disable-next-line no-use-before-define
  message: Message;
  // channel: BaseTextableChannel;
  // member?: GuildMember;
  // guild: Guild;
}

export class Reactions {
  private reactions: Reaction[];
  // eslint-disable-next-line no-use-before-define
  private message: Message;

  constructor(reactions: RawReaction[], message: Message) {
    this.reactions = reactions.map((reaction) => new Reaction(reaction));
    this.message = message;
  }

  has(emoji: string): boolean {
    return this.reactions.some((reaction) => reaction.emoji.toString() === emoji);
  }

  get(emoji: string): Reaction | undefined {
    return this.reactions.find((reaction) => reaction.emoji.toString() === emoji);
  }

  getAll(): Reaction[] {
    return this.reactions;
  }

  create() {
    throw new Error("Method not implemented.");
  }

  delete() {
    throw new Error("Method not implemented.");
  }
}

export interface MessageOptions {
  content?: string;
  tts?: boolean;
  embeds?: Embed[];
  allowedMentions?: RawAllowedMentions;
  components?: ActionRow[];
  stickerIds?: string[];
  messageReference?: MessageReference;
  attachments?: Attachment[];
  flags?: MessageFlags[];
}

export default class Message {
  id: string;
  channelId: string;
  author: User;
  // member?: GuildMember;
  content: string;
  timestamp: Date;
  editedTimestamp?: Date;
  tts: boolean;
  mentions: Mentions;
  attachments: Attachment[];
  embeds: Embed[];
  reactions: Reactions;
  pinned: boolean;
  webhook_id?: string;
  type: MessageTypes;
  messageReference?: MessageReference;
  flags?: Bitfield<MessageFlags>;
  // eslint-disable-next-line no-use-before-define
  referencedMessage?: Message;
  // interaction?: InMessageInteraction;
  // thread?: ThreadChannel;
  // components: Components = new Components();
  stickerItems?: PartialSticker[];

  constructor(message: RawMessage) {
    this.id = message.id;
    this.channelId = message.channel_id;
    this.author = new User(message.author);
    this.content = message.content;
    this.timestamp = new Date(message.timestamp);
    if (message.edited_timestamp) this.timestamp = new Date(message.edited_timestamp);
    this.tts = message.tts;
    this.mentions = new Mentions(
      message.mentions,
      message.mention_channels,
      message.mention_roles,
      message.mention_everyone
    );
    this.attachments = message.attachments.map((a) => new Attachment(a));
    this.embeds = message.embeds.map((e) => Embed.from(e));
    this.reactions = new Reactions(message.reactions ?? [], this);
    this.pinned = message.pinned;
    this.type = message.type;
    if (message.message_reference)
      this.messageReference = new MessageReference(message.message_reference);
    if (message.flags) this.flags = new Bitfield(message.flags);
    if (message.referenced_message)
      this.referencedMessage = new Message(message.referenced_message);
    this.stickerItems = message.sticker_items?.map((s) => new PartialSticker(s));
  }

  static create(message: MessageOptions): RawMessageOptions {
    return {
      allowed_mentions: message.allowedMentions,
      attachments: message.attachments?.map((a) => a.toJson()),
      content: message.content,
      embeds: message.embeds?.map((e) => e.toJson()),
      flags: message.flags?.reduce((a, b) => a + b),
      message_reference: message.messageReference?.toJson(),
      components: message.components?.map((c) => c.toJson()),
      sticker_ids: message.stickerIds,
      tts: message.tts,
    };
  }
}
