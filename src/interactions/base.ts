import { Client } from "../client";
import { GuildMember } from "../member";
import Message, { Attachment } from "../message";
import {
  RawInteraction,
  RawInteractionApplicationCommandData,
  RawInteractionCommandDataOption,
} from "../rawTypes";
import { CommandOptionTypes, CommandTypes, InteractionTypes } from "../enums";
import User from "../user";
import { MessageInteraction } from "./message";
import SlashInteraction from "./slash";
import { UserInteraction } from "./user";
import { Guild } from "../guild";

export default class BaseInteraction {
  id: string;
  type: InteractionTypes;
  guildId?: string;
  channelId?: string;
  user?: User;
  token: string;
  applicationId: string;
  locale?: string;
  guildLocale?: string;
  member?: GuildMember;
  private commandType?: CommandTypes;
  protected client: Client;

  constructor(interaction: RawInteraction, client: Client) {
    this.id = interaction.id;
    this.type = interaction.type;
    this.guildId = interaction.guild_id;
    if (interaction.user) this.user = new User(interaction.user);
    if (interaction.member && this.guild)
      this.member = new GuildMember(interaction.member, this.guild, client);
    this.token = interaction.token;
    this.applicationId = interaction.application_id;
    // this.permissions = interaction.app
    this.locale = interaction.locale;
    this.guildLocale = interaction.guild_locale;
    this.client = client;
    if (
      interaction.type === InteractionTypes.APPLICATION_COMMAND ||
      interaction.type === InteractionTypes.APPLICATION_COMMAND_AUTOCOMPLETE
    )
      this.commandType = (interaction.data as RawInteractionApplicationCommandData)?.type;
  }

  get guild(): Guild | undefined {
    return this.guildId ? this.client.guilds.get(this.guildId) : undefined;
  }

  isSlash(): this is SlashInteraction {
    return this.commandType === CommandTypes.CHAT_INPUT;
  }

  isUser(): this is UserInteraction {
    return this.commandType === CommandTypes.USER;
  }

  isMessage(): this is MessageInteraction {
    return this.commandType === CommandTypes.MESSAGE;
  }
}

export interface CommandDataOption {
  name: string;
  type: CommandOptionTypes;
  value?: string | number;
  options?: CommandDataOption[];
  focused?: boolean;
}

export class CommandData {
  id: string;
  name: string;
  type: CommandTypes;
  resolved?: {
    users: Map<string, User>;
    messages: Map<string, Message>;
    attachments: Map<string, Attachment>;
  };
  options?: CommandDataOption[];
  guildId?: string;
  targetId?: string;

  constructor(resolved: RawInteractionApplicationCommandData) {
    this.id = resolved.id;
    this.name = resolved.name;
    this.type = resolved.type;
    if (resolved.options) this.options = this.transformOptions(resolved.options);
    this.guildId = resolved.guild_id;
    this.targetId = resolved.target_id;
    if (resolved.resolved)
      this.resolved = {
        users: new Map(),
        attachments: new Map(),
        messages: new Map(),
      };

    if (resolved.resolved?.users)
      Object.entries(resolved.resolved.users).forEach(([id, user]) =>
        this.resolved?.users.set(id, new User(user))
      );
    if (resolved.resolved?.attachments)
      Object.entries(resolved.resolved.attachments).forEach(([id, attachment]) =>
        this.resolved?.attachments.set(id, new Attachment(attachment))
      );
    if (resolved.resolved?.messages)
      Object.entries(resolved.resolved.messages).forEach(([id, message]) =>
        this.resolved?.messages.set(id, new Message(message))
      );
  }

  private transformOptions(options: RawInteractionCommandDataOption[]): CommandDataOption[] {
    return options.map((option) => ({
      type: option.type,
      options: option.options && this.transformOptions(option.options),
      name: option.name,
      focused: option.focused,
      value: option.value,
    }));
  }
}
