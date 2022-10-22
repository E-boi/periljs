import { EventEmitter } from 'ws';
import {
  BaseTextableChannel,
  PartailChannel,
  ThreadChannel,
  ThreadMember,
} from './Channel';
import { CommandManager } from './Command';
import { Intents } from './discord';
import { Emoji } from './Emoji';
import Gateway from './gateway';
import { Guild } from './Guild';
import HTTPS from './HTTPS';
import {
  ButtonInteraction,
  MessageInteraction,
  ModalInteraction,
  SelectMenuInteraction,
  SlashInteraction,
  UserInteraction,
} from './Interaction';
import { Message, MessageReaction } from './Message';
import { Role } from './Role';
import { Sticker } from './Sticker';
import { GuildMember, User } from './User';

export interface Options {
  token: string;
  intents: (keyof typeof Intents | Intents)[];
  getAllMembers?: boolean;
}

/**
 * A client to interact with the Discord API
 *
 * @extends EventEmitter
 */

export default class Client extends EventEmitter {
  private ws?: Gateway;
  private options: Options;
  private request: HTTPS;

  declare on: <K extends keyof ClientEvents>(
    event: K,
    listener: (...args: ClientEvents[K]) => void
  ) => this;
  declare once: <K extends keyof ClientEvents>(
    event: K,
    listener: (...args: ClientEvents[K]) => void
  ) => this;
  declare off: <K extends keyof ClientEvents>(
    event: K,
    listener: (...args: ClientEvents[K]) => void
  ) => this;
  declare emit: <K extends keyof ClientEvents>(
    event: K,
    ...args: ClientEvents[K]
  ) => boolean;
  declare removeAllListeners: <K extends keyof ClientEvents>(event: K) => this;

  user?: User;
  guilds: Map<string, Guild> = new Map();
  channels: Map<string, PartailChannel> = new Map();
  commands: CommandManager;
  getAllMembers?: boolean;

  /**
   * @param {Options} options
   */
  constructor(options: Options) {
    super();
    this.options = options;
    this.request = new HTTPS(options.token, this);
    this.commands = new CommandManager(this, this.request);
    this.getAllMembers = options.getAllMembers;
  }

  /**
   * Connects to Discord
   */
  connect() {
    this.ws = new Gateway(this.options, this, this.request);
  }

  reconnect() {
    this.ws?.reconnect();
  }

  disconnect() {
    this.ws?.close(1000);
    delete this.ws;
  }
}

export interface ClientEvents {
  ready: [user: User];
  'guild.create': [guild: Guild];
  'guild.update': [oldGuild: Guild, guild: Guild];
  'guild.delete': [guild: Guild];
  'guild.emojis.update': [emojis: Emoji[], guild: Guild];
  'guild.stickers.update': [stickers: Sticker[], guild: Guild];
  'guild.member.add': [member: GuildMember, guild: Guild];
  'guild.member.update': [
    oldMember: GuildMember,
    member: GuildMember,
    guild: Guild
  ];
  'guild.member.remove': [member: GuildMember, guild: Guild];
  'guild.ban.add': [ban: { guildId: string; user: User }];
  'guild.ban.remove': [ban: { guildId: string; user: User }];
  'guild.role.create': [role: Role, guild: Guild];
  'guild.role.update': [oldRole: Role, role: Role, guild: Guild];
  'guild.role.delete': [role: Role, guild: Guild];
  'channel.create': [channel: PartailChannel];
  'channel.update': [oldChannel: PartailChannel, channel: PartailChannel];
  'channel.delete': [channel: PartailChannel];
  'channel.pins.update': [channel: BaseTextableChannel];
  'thread.create': [channel: ThreadChannel];
  'thread.update': [oldChannel: ThreadChannel, channel: ThreadChannel];
  'thread.delete': [channel: ThreadChannel];
  'thread.member.update': [member: ThreadMember & { guildId: string }];
  'message.create': [message: Message];
  'message.update': [oldMessage: Message, message: Message];
  'message.delete': [message: Message];
  'message.reaction.add': [reaction: MessageReaction];
  'message.reaction.remove': [reaction: Omit<MessageReaction, 'member'>];
  'interaction.slash': [interaction: SlashInteraction];
  'interaction.user': [interaction: UserInteraction];
  'interaction.message': [interaction: MessageInteraction];
  'interaction.modal': [interaction: ModalInteraction];
  'interaction.button': [interaction: ButtonInteraction];
  'interaction.selectmenu': [interaction: SelectMenuInteraction];
}
