import { DiscordEvent } from "../const/discord/event";

export 
interface CommandContext {
    message: IMessage | SlashInteraction;
    channel: ITextChannel | Thread;
    author: IGuildMember /* | MemberShard */;
    event: DiscordEvent; // the event that Discord sent the client that causes this command to be invoked (Usually MESSAGE_CREATE)

    isSlashCommand?: boolean; // if set to true, {message} is an Interaction.
    validateResults?: object; // the return value, if anything other then a boolean, of the CommandProps validateRun function.
    args: ICommandArg[] | string[] | any[];
}