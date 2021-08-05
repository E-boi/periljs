import { Permissions } from "./discord/permissions";
import { CommandContext } from "./commandContext";
export
interface CommandProps {
    name: string;
    description: string;
    usage: string;
    slash: boolean;
    meta: boolean;
    hidden: boolean;
    aliases: string[];
    requiredPermissions: Permissions;
    ownerOnly: boolean;
    guildRequired: boolean;
    validateRun: (ctx: CommandContext) => boolean | undefined;
}

export
interface InternalCommandProps {
    filename: string;
    directory: string;
}