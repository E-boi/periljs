import Client from './Client';
import HTTPS from './HTTPS';
import {
  MessageInteraction,
  SlashInteraction,
  UserInteraction,
} from './Interaction';
import {
  ChannelTypes,
  CommandOptionType,
  Commandtype,
  RawInteractionCommand,
  RawInterationCommandOption,
} from './RawTypes';

export class CommandManager {
  private commands: Map<
    string,
    (
      interaction: SlashInteraction | UserInteraction | MessageInteraction
    ) => void
  > = new Map();
  private queue: {
    command: Command;
    handler: (
      interaction: SlashInteraction | UserInteraction | MessageInteraction
    ) => void;
  }[] = [];

  constructor(private client: Client, private request: HTTPS) {
    client.on('interaction.slash', interaction => {
      const command = this.commands.get(interaction.command.id);
      command?.(interaction);
    });

    client.on('interaction.user', interaction => {
      const command = this.commands.get(interaction.command.id);
      command?.(interaction);
    });

    client.on('interaction.message', interaction => {
      const command = this.commands.get(interaction.command.id);
      command?.(interaction);
    });

    client.once('ready', () => {
      this.queue.forEach(queue => this.set(queue.command, queue.handler));
    });
  }

  async set(
    commandC: Command,
    handler?: (
      interaction: SlashInteraction | UserInteraction | MessageInteraction
    ) => void
  ) {
    if (!this.client.user && handler) {
      this.queue.push({ command: commandC, handler });
      return;
    }
    const command = await this.request.setInteraction(
      this.transformCommand(commandC)
    );
    if (command && handler) this.commands.set(command.id, handler);
    return;
  }

  async get(
    commandId: string,
    guildId?: string
  ): Promise<RawInteractionCommand | void> {
    return await this.request.getInteraction(commandId, guildId);
  }

  async getAll(guildId?: string): Promise<RawInteractionCommand[] | void> {
    return await this.request.getInteractionAll(guildId);
  }

  async delete(commandId: string, guild?: string) {
    return await this.request.deleteInteraction(commandId, guild);
  }

  private transformCommand(
    command: Command
  ): Omit<RawInteractionCommand, 'application_id' | 'version' | 'id'> {
    const transformed = {
      name: command.name,
      type: Commandtype[command.type],
      default_member_permissions: command.defaultMemberPermissions,
      description:
        command.type === 'CHAT_INPUT' ? command.description : undefined,
      description_localizations:
        command.type === 'CHAT_INPUT'
          ? command.description_localizations
          : undefined,
      dm_permission: command.dmPermission,
      guild_id: command.guildId,
      name_localizations: command.nameLocalizations,
      options:
        command.type === 'CHAT_INPUT'
          ? command.options?.map(option => this.tranformOption(option))
          : undefined,
    };

    return transformed;
  }

  private tranformOption(option: CommandOption): RawInterationCommandOption {
    const transformed: RawInterationCommandOption = {
      description: option.description,
      name: option.name,
      type: CommandOptionType[option.type],
      autocomplete: option.autocomplete,
      channel_types: option.channelTypes?.map(c => ChannelTypes[c]),
      choices: option.choices?.map(choice => ({
        name: choice.name,
        value: choice.value,
        name_localizations: choice.nameLocalizations,
      })),
      description_localizations: option.descriptionLocalizations,
      max_value: option.maxValue,
      min_value: option.minValue,
      name_localizations: option.nameLocalizations,
      options: option.options?.map(option => this.tranformOption(option)),
      required: option.required,
    };

    return transformed;
  }
}

export type Command =
  | {
      type: 'CHAT_INPUT';
      name: string;
      nameLocalizations?: { [k: string]: string };
      description: string;
      description_localizations?: { [k: string]: string };
      options?: CommandOption[];
      defaultMemberPermissions?: string;
      dmPermission?: boolean;
      guildId?: string;
    }
  | {
      type: 'USER';
      name: string;
      nameLocalizations?: { [k: string]: string };
      defaultMemberPermissions?: string;
      dmPermission?: boolean;
      guildId?: string;
    }
  | {
      type: 'MESSAGE';
      name: string;
      nameLocalizations?: { [k: string]: string };
      defaultMemberPermissions?: string;
      dmPermission?: boolean;
      guildId?: string;
    };

export interface CommandOption {
  type: keyof typeof CommandOptionType;
  name: string;
  nameLocalizations?: { [k: string]: string };
  description: string;
  descriptionLocalizations?: { [k: string]: string };
  required?: boolean;
  choices?: CommandOptionChoice[];
  options?: CommandOption[];
  channelTypes?: (keyof typeof ChannelTypes)[];
  minValue?: number;
  maxValue?: number;
  autocomplete?: boolean;
}

export interface CommandDataOption {
  name: string;
  type: keyof typeof CommandOptionType;
  value?: string | number;
  options?: CommandDataOption[];
  focused?: boolean;
}

export interface CommandOptionChoice {
  name: string;
  nameLocalizations?: { [k: string]: string };
  value: string | number;
}
