import { RawApplicationCommandCreate } from "../rawTypes";
import { CommandTypes, Permissions } from "../enums";
import { CommandOption } from "./command";

export interface SlashCommandFields {
  name: string;
  nameLocalizations: Map<string, string>;
  description: string;
  descriptionLocalizations: Map<string, string>;
  options?: CommandOption[];
  defaultMemberPermissions?: Permissions[];
  dmPermission?: boolean;
  nsfw?: boolean;
  guildId?: string;
}

/**
 * @category Commands
 */
export class SlashCommand implements SlashCommandFields {
  name: string;
  nameLocalizations: Map<string, string> = new Map();
  description: string;
  descriptionLocalizations: Map<string, string> = new Map();
  options?: CommandOption[];
  defaultMemberPermissions?: Permissions[];
  dmPermission?: boolean;
  nsfw?: boolean;
  guildId?: string;

  constructor(command: Omit<SlashCommandFields, "nameLocalizations" | "descriptionLocalizations">) {
    this.name = command.name;
    this.description = command.description;
    this.options = command.options;
    this.defaultMemberPermissions = command.defaultMemberPermissions;
    this.dmPermission = command.dmPermission;
    this.nsfw = command.nsfw;
    this.guildId = command.guildId;
  }

  toJson(): RawApplicationCommandCreate {
    const command: RawApplicationCommandCreate = {
      name: this.name,
      name_localizations: this.nameLocalizations.size > 0 ? {} : undefined,
      description: this.description,
      description_localizations: this.descriptionLocalizations.size > 0 ? {} : undefined,
      options: this.options?.map((option) => option.toJson()),
      type: CommandTypes.CHAT_INPUT,
      default_member_permissions: this.defaultMemberPermissions?.reduce((a, b) => a + b).toString(),
      dm_permission: this.dmPermission,
      nsfw: this.nsfw,
    };

    this.nameLocalizations?.forEach((local, lang) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      command.name_localizations![lang] = local;
    });

    this.descriptionLocalizations?.forEach((local, lang) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      command.description_localizations![lang] = local;
    });

    return command;
  }
}
