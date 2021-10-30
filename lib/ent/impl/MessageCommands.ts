import { Embed, GuildMember, Message } from "../../..";
import { IMessageCreate } from "../intf/IMessage";
import { IMessageCommandData } from "../intf/IMessageCommandData";
import { IMessageContext } from "../intf/IMessageContext";
import Client from "./client";



export class MessageCommands {
    readonly client: Client;
    commands: Map<IMessageCommandData, (ctx: IMessageContext) => void>;
    constructor(bot: Client )
    {
        this.client = bot;
        this.commands = new Map<IMessageCommandData, (ctx: IMessageContext) => void>();
        this.client.on("message.create", this.onMessage.bind(this));
    }
    add(commandData: IMessageCommandData, action: (ctx: IMessageContext) => void): void{
        this.commands.set(commandData, action);
    }
    onMessage(message: Message): void{
        if(message.author.bot) return;
        if(message.content.startsWith(this.client.config.prefix)){
            let command = message.content.substring(this.client.config.prefix.length);
            let args = command.split(" ");
            command = args.shift() as string;
            Array.from(this.commands.keys()).forEach(element => {
                element.command?.toLowerCase() == command.toLowerCase() && (this.commands.get(element) || ((...yargs: any[]) => {return;})) ({
                    message: message,
                    author: message.member,
                    channel: message.channel,
                    guild: message.guild,
                    deleteMessage: () => {
                        return (message.channel && this.client.HTTP.deleteMessage(message.id, message.channel.id.toString()))
                    },
                    banMember: (member: GuildMember, delay?: number) => {
                        return member.ban();
                    },
                    kickMember: (member: GuildMember, delay?: number) => {
                        return member.kick();
                    },
                    sendMessage: (content: IMessageCreate ) => {
                        return this.client.sendMessage(content, message.channelId.toString())
                    },
                    sendEmbed: (embed: Embed) => {
                        return this.client.sendEmbed(embed, message.channelId.toString())
                    },
                    reply: (content: IMessageCreate) => {
                        return message?.reply(content);
                    },
                    replyEmbed: (embed: Embed) => {
                        return message?.reply({embeds: [embed]} as IMessageCreate);
                    }


                } as IMessageContext);
            });
            
        }

    }
}