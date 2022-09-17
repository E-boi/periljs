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
import { Message } from './Message';
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
  declare on: ClientEvents<this>;
  declare once: ClientEvents<this>;
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

  disconnect() {
    this.ws?.close();
    delete this.ws;
  }
}

export interface ClientEvents<T> {
  (event: 'ready', listener: (user: User) => void): T;
  (event: 'guild.create', listener: (guild: Guild) => void): T;
  (event: 'guild.update', listener: (oldGuild: Guild, guild: Guild) => void): T;
  (event: 'guild.delete', listener: (guild: Guild) => void): T;
  (
    event: 'guild.emojis.update',
    listener: (emojis: Emoji[], guild: Guild) => void
  ): T;
  (
    event: 'guild.stickers.update',
    listener: (stickers: Sticker[], guild: Guild) => void
  ): T;
  (
    event: 'guild.member.add',
    listener: (member: GuildMember, guild: Guild) => void
  ): T;
  (
    event: 'guild.member.update',
    listener: (oldMember: GuildMember, member: GuildMember) => void
  ): T;
  (
    event: 'guild.member.remove',
    listener: (member: GuildMember, guild: Guild) => void
  ): T;
  (
    event: 'guild.ban.add',
    listener: (ban: { guildId: string; user: User }) => void
  ): T;
  (
    event: 'guild.ban.remove',
    listener: (ban: { guildId: string; user: User }) => void
  ): T;
  (event: 'guild.role.create', listener: (role: Role, guild: Guild) => void): T;
  (
    event: 'guild.role.update',
    listener: (oldRole: Role, role: Role, guild: Guild) => void
  ): T;
  (event: 'guild.role.delete', listener: (role: Role, guild: Guild) => void): T;
  (event: 'channel.create', listener: (channel: PartailChannel) => void): T;
  (
    event: 'channel.update',
    listener: (oldChannel: PartailChannel, channel: PartailChannel) => void
  ): T;
  (event: 'channel.delete', listener: (channel: PartailChannel) => void): T;
  (
    event: 'channel.pins.update',
    listener: (channel: BaseTextableChannel) => void
  ): T;
  (event: 'thread.create', listener: (channel: ThreadChannel) => void): T;
  (
    event: 'thread.update',
    listener: (oldChannel: ThreadChannel, channel: ThreadChannel) => void
  ): T;
  (event: 'thread.delete', listener: (channel: ThreadChannel) => void): T;
  (
    event: 'thread.member.update',
    listener: (member: ThreadMember & { guildId: string }) => void
  ): T;
  (event: 'message.create', listener: (message: Message) => void): T;
  (
    event: 'message.update',
    listener: (oldMessage: Message, message: Message) => void
  ): T;
  (event: 'message.delete', listener: (message: Message) => void): T;
  (
    event: 'message.reaction.add',
    listener: (reaction: {
      emoji: Emoji;
      userId: string;
      message: Message;
      channel: BaseTextableChannel;
      member?: GuildMember;
    }) => void
  ): T;
  (
    event: 'message.reaction.remove',
    listener: (reaction: {
      emoji: Emoji;
      userId: string;
      message: Message;
      channel: BaseTextableChannel;
    }) => void
  ): T;
  (
    event: 'interaction.slash',
    listener: (interaction: SlashInteraction) => void
  ): T;
  (
    event: 'interaction.user',
    listener: (interaction: UserInteraction) => void
  ): T;
  (
    event: 'interaction.message',
    listener: (interaction: MessageInteraction) => void
  ): T;
  (
    event: 'interaction.modal',
    listener: (interaction: ModalInteraction) => void
  ): T;
  (
    event: 'interaction.button',
    listener: (interaction: ButtonInteraction) => void
  ): T;
  (
    event: 'interaction.selectmenu',
    listener: (interaction: SelectMenuInteraction) => void
  ): T;
}
