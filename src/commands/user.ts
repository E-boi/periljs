import { RawApplicationCommandCreate } from "../rawTypes";
import { CommandTypes, Permissions } from "../enums";
import { CommandOption } from "./command";

export interface UserCommandFields {
  name: string;
  nameLocalizations: Map<string, string>;
  options?: CommandOption[];
  defaultMemberPermissions?: Permissions[];
  dmPermission?: boolean;
  nsfw?: boolean;
  guildId?: string;
}

/**
 * @category Commands
 */
export class UserCommand implements UserCommandFields {
  name: string;
  nameLocalizations: Map<string, string> = new Map();
  defaultMemberPermissions?: Permissions[];
  dmPermission?: boolean;
  nsfw?: boolean;
  guildId?: string;

  constructor(command: Omit<UserCommandFields, "nameLocalizations" | "descriptionLocalizations">) {
    this.name = command.name;
    this.defaultMemberPermissions = command.defaultMemberPermissions;
    this.dmPermission = command.dmPermission;
    this.nsfw = command.nsfw;
    this.guildId = command.guildId;
  }

  toJson(): RawApplicationCommandCreate {
    const command: RawApplicationCommandCreate = {
      name: this.name,
      name_localizations: this.nameLocalizations.size > 0 ? {} : undefined,
      type: CommandTypes.USER,
      default_member_permissions: this.defaultMemberPermissions?.reduce((a, b) => a + b).toString(),
      dm_permission: this.dmPermission,
      nsfw: this.nsfw,
    };

    this.nameLocalizations?.forEach((local, lang) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      command.name_localizations![lang] = local;
    });

    return command;
  }
}
