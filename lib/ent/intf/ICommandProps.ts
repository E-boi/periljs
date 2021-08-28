import { Permissions } from "../const/discord/permissions";
import { ICommandContext } from "./ICommandContext";
export
interface ICommandProps {
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
    validateRun: (ctx: ICommandContext) => boolean | undefined;
}

export
interface IInternalCommandProps {
    filename: string;
}