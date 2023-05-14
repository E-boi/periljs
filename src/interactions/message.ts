import { Client } from "../client";
import Message from "../message";
import { RawInteraction, RawInteractionApplicationCommandData } from "../rawTypes";
import { CommandData } from "./base";
import { ModalReplyableInteraction } from "./replyable";

export class MessageInteraction extends ModalReplyableInteraction {
  command: CommandData;
  constructor(interaction: RawInteraction, client: Client) {
    super(interaction, client);
    this.command = new CommandData(interaction.data as RawInteractionApplicationCommandData);
  }

  get targetMessage(): Message | undefined {
    const message = this.command?.resolved?.messages?.get(this.command.targetId!);
    return message;
  }
}
