import { Client } from "../client";
import { RawInteraction, RawInteractionApplicationCommandData } from "../rawTypes";
import User from "../user";
import { CommandData } from "./base";
import { ModalReplyableInteraction } from "./replyable";

export class UserInteraction extends ModalReplyableInteraction {
  command: CommandData;
  constructor(interaction: RawInteraction, client: Client) {
    super(interaction, client);
    this.command = new CommandData(interaction.data as RawInteractionApplicationCommandData);
  }

  get targetUser(): User | undefined {
    const rawUser = this.command?.resolved?.users?.get(this.command.targetId!);
    return rawUser;
  }
}
