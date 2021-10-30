import { Client, DMChannel, Embed, Guild, GuildMember, Message, TextChannel } from "../../..";
import { IMessageCreate } from "./IMessage";

export interface IMessageContext {
    client: Client;
    message: Message;
    author: GuildMember;
    // timestamp: string;
    channel: TextChannel | DMChannel;
    guild: Guild;
    strippedContent: string;
    deleteMessage(): void;
    banMember(member: GuildMember): void;
    kickMember(member: GuildMember): void;
    sendMessage(content: string | IMessageCreate): void;
    sendEmbed(embed: Embed): void;
    reply(content: string | IMessageCreate): void;
    replyEmbed(embed: Embed): void;
}