import { Client } from "../client";
import { RawInteraction, RawInteractionApplicationCommandData } from "../rawTypes";
import { CommandData, CommandDataOption } from "./base";
import { ModalReplyableInteraction } from "./replyable";

export default class SlashInteraction extends ModalReplyableInteraction {
  command: CommandData;

  constructor(interaction: RawInteraction, client: Client) {
    super(interaction, client);
    this.command = new CommandData(interaction.data as RawInteractionApplicationCommandData);
  }

  getOption(name: string, options?: CommandDataOption[]): CommandDataOption | undefined {
    const opts = options ?? this.command.options;

    if (!opts) return undefined;
    for (const option of opts) {
      if (option.name === name) return option;
      if (option.options) {
        const found = this.getOption(name, option.options);
        if (found) return found;
      }
    }

    return undefined;
  }
}
