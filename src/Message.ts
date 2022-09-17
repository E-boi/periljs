import { BaseTextableChannel, MessageOptions, ThreadChannel } from './Channel';
import { Components } from './Component';
import { Embed } from './Embed';
import { Emoji } from './Emoji';
import { Guild } from './Guild';
import HTTPS, { RawMessageOptions } from './HTTPS';
import { BaseInteraction, InMessageInteraction } from './Interaction';
import {
  ChannelTypes,
  MessageFlags,
  MessageTypes,
  RawAttachment,
  RawChannelMention,
  RawEmbed,
  RawMessage,
  RawReaction,
  RawUser,
  StickerFormatTypes,
} from './RawTypes';
import { PartailSticker } from './Sticker';
import { GuildMember, User } from './User';

export class Message {
  id: string;
  channelId: string;
  author?: User;
  // member?: GuildMember;
  content: string;
  timestamp: Date;
  edited_timestamp?: Date;
  tts: boolean;
  mentions: Mentions;
  attachments: Attachment[];
  embeds: Embed[];
  reactions: Reactions;
  pinned: boolean;
  webhook_id?: string;
  type: keyof typeof MessageTypes;
  messageReference?: MessageReference;
  flags?: MessageFlags;
  referencedMessage?: Message;
  interaction?: InMessageInteraction;
  thread?: ThreadChannel;
  components: Components = new Components();
  stickerItems?: PartailSticker[];

  constructor(message: RawMessage, private request: HTTPS) {
    this.id = message.id;
    this.channelId = message.channel_id;
    this.author = message.author && new User(message.author);
    this.content = message.content;
    this.timestamp = new Date(message.timestamp);
    this.edited_timestamp = message.edited_timestamp
      ? new Date(message.edited_timestamp)
      : undefined;
    this.attachments = message.attachments.map(
      attachment => new Attachment(attachment)
    );

    this.tts = message.tts;
    this.mentions = new Mentions(
      message.mentions,
      message.mention_channels,
      message.mention_roles,
      message.mention_everyone
    );
    this.embeds = message.embeds.map(embed => Embed.from(embed));
    this.reactions = new Reactions(message.reactions || [], this, request);
    this.pinned = message.pinned;
    this.webhook_id = message.webhook_id;
    this.type = MessageTypes[message.type] as keyof typeof MessageTypes;
    this.messageReference = {
      channelId: message.message_reference?.channel_id,
      guildId: message.message_reference?.guild_id,
      messageId: message.message_reference?.message_id,
    };
    this.flags = message.flags;
    this.referencedMessage =
      message.referenced_message &&
      new Message(message.referenced_message, request);
    this.interaction =
      message.interaction &&
      BaseInteraction.messageInteraction(message.interaction, this.guild);
    this.thread = message.thread && new ThreadChannel(message.thread, request);
    message.components?.forEach(component =>
      this.components.add(...Components.from(...component.components).getAll())
    );
    this.stickerItems = message.sticker_items?.map(sticker => ({
      formatType: StickerFormatTypes[
        sticker.format_type
      ] as keyof typeof StickerFormatTypes,
      id: sticker.id,
      name: sticker.name,
    }));
  }

  get channel(): BaseTextableChannel | undefined {
    return this.request.client.channels.get(
      this.channelId
    ) as BaseTextableChannel;
  }

  get guild(): Guild | undefined {
    if (this.channel?.inGuild())
      return this.request.client.guilds.get(this.channel.guildId);
  }

  get member(): GuildMember | undefined {
    return this.author && this.guild?.members.get(this.author?.id);
  }

  async reply(message: MessageOptions | string) {
    await this.request.createMessage(this.channelId, {
      ...Message.create(message),
      message_reference: { channel_id: this.channelId, message_id: this.id },
    });
  }

  async edit(message: MessageOptions | string) {
    await this.request.editMessage(
      this.channelId,
      this.id,
      Message.create(message)
    );
  }

  async pin(reason?: string) {
    if (this.pinned) return;
    await this.request.pinMessage(
      this.channelId,
      this.id,
      reason ? { 'X-Audit-Log-Reason': reason } : undefined
    );
    this.pinned = true;
  }

  async unpin(reason?: string) {
    if (!this.pinned) return;
    await this.request.unpinMessage(
      this.channelId,
      this.id,
      reason ? { 'X-Audit-Log-Reason': reason } : undefined
    );
  }

  isPinnable(): boolean {
    return (
      this.type === 'CHAT_INPUT_COMMAND' ||
      this.type === 'DEFAULT' ||
      this.type === 'REPLY'
    );
  }

  static create(message: MessageOptions | string): RawMessageOptions {
    if (typeof message === 'string') message = { content: message };
    const components = Array.isArray(message.components)
      ? new Components(...message.components).toJSON()
      : message.components?.toJSON();
    const embeds = message.embeds?.map<RawEmbed>(embed => {
      if (embed instanceof Embed) return embed.toJSON();
      return new Embed(embed).toJSON();
    });

    return {
      allowed_mentions: message.allowedMentions,
      components,
      content: message.content,
      embeds,
      message_reference: message.messageReference && {
        channel_id: message.messageReference.channelId,
        message_id: message.messageReference.messageId,
        guild_id: message.messageReference.messageId,
      },
      sticker_ids: message.stickerIds,
      tts: message.tts,
      flags: message.flags
        ?.map<MessageFlags>(flag => MessageFlags[flag])
        .reduce((a, b) => a + b),
    };
  }
}

export class Attachment {
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

  constructor(attachment: RawAttachment) {
    this.id = attachment.id;
    this.filename = attachment.filename;
    this.description = attachment.description;
    this.content_type = attachment.content_type;
    this.size = attachment.size;
    this.url = attachment.url;
    this.proxy_url = attachment.proxy_url;
    this.height = attachment.height;
    this.width = attachment.width;
    this.ephemeral = attachment.ephemeral;
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
    users?.map(user => this.users.set(user.id, new User(user)));
    channels?.map(channel =>
      this.channels.set(channel.id, {
        guildId: channel.guild_id,
        id: channel.id,
        name: channel.name,
        type: ChannelTypes[channel.type] as keyof typeof ChannelTypes,
      })
    );
    roles?.map(role => this.roles.set(role, role));
  }

  has(id: string): boolean {
    return this.users.has(id) ?? this.channels.has(id) ?? this.roles.has(id);
  }
}

export class Reaction {
  count: number;
  me: boolean;
  emoji: Emoji;

  constructor(reaction: RawReaction) {
    this.count = parseInt(reaction.count);
    this.me = reaction.me;
    this.emoji = new Emoji(reaction.emoji);
  }
}

export class Reactions {
  reactions: Reaction[];

  constructor(
    reactions: RawReaction[],
    private message: Message,
    private request: HTTPS
  ) {
    this.reactions = reactions.map(reaction => new Reaction(reaction));
  }

  has(emoji: string): boolean {
    return this.reactions.some(reaction => reaction.emoji.toString() === emoji);
  }

  get(emoji: string): Reaction | undefined {
    return this.reactions.find(reaction => reaction.emoji.toString() === emoji);
  }

  getAll(): Reaction[] {
    return this.reactions;
  }

  async create(emoji: string) {
    await this.request.createReaction(
      this.message.channelId,
      this.message.id,
      emoji
    );
  }

  async delete(emoji: string, userId?: string) {
    await this.request.deleteReaction(
      this.message.channelId,
      this.message.id,
      emoji,
      userId
    );
  }
}

export type ChannelMention = Omit<RawChannelMention, 'guild_id' | 'type'> & {
  guildId: string;
  type: keyof typeof ChannelTypes;
};

export interface MessageReference {
  messageId?: string;
  channelId?: string;
  guildId?: string;
}
