import { Client } from "../client";
import { MessageInteraction } from "../interactions/message";
import SlashInteraction from "../interactions/slash";
import { UserInteraction } from "../interactions/user";
import { RawApplicationCommand } from "../rawTypes";
import { MessageCommand } from "./message";
import { SlashCommand } from "./slash";
import { UserCommand } from "./user";

export type InteractionHandler = (
  interaction: SlashInteraction | UserInteraction | MessageInteraction
) => void;

export class CommandManger {
  private client: Client;
  private commands: Map<string, InteractionHandler> = new Map();
  private queue: {
    command: SlashCommand | UserCommand | MessageCommand;
    handler: InteractionHandler;
  }[] = [];

  constructor(client: Client) {
    this.client = client;
    this.setupListeners();
  }

  private setupListeners() {
    this.client.once("ready", () => {
      if (this.queue.length > 0)
        this.queue.forEach(({ command, handler }) => this.set(command, handler));
    });

    this.client.on("interaction.slash", (interaction) => {
      this.commands.get(interaction.command.id)?.(interaction);
    });

    this.client.on("interaction.user", (interaction) => {
      this.commands.get(interaction.command.id)?.(interaction);
    });

    this.client.on("interaction.message", (interaction) => {
      this.commands.get(interaction.command.id)?.(interaction);
    });
  }

  async set(command: SlashCommand | UserCommand | MessageCommand, handler: InteractionHandler) {
    if (!this.client.user?.id) {
      this.queue.push({ command, handler });
      return;
    }

    let res: RawApplicationCommand;

    if (command.guildId)
      res = await this.client.rest.createGuildApplicationCommand(
        this.client.user.id,
        command.guildId,
        command.toJson()
      );
    else
      res = await this.client.rest.createGlobalApplicationCommand(
        this.client.user.id,
        command.toJson()
      );

    this.commands.set(res.id, handler);
  }

  delete(commandId: string, guildId?: string) {
    if (!this.client.user) throw new Error("Connect to Discord first before deleting commands");

    if (guildId) {
      this.commands.delete(commandId);
      return this.client.rest.deleteGuildApplicationCommmand(
        this.client.user.id,
        guildId,
        commandId
      );
    }

    return this.client.rest.deleteGlobalApplicationCommmand(this.client.user.id, commandId);
  }
}
