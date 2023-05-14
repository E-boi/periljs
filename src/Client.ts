import { Gateway } from "./gateway";
import { Intents } from "./gateway/intents";
import Logger from "./logger";
import { Rest } from "./rest";
import { CommandManger } from "./commands/manger";
import ClientUser from "./clientUser";
import SlashInteraction from "./interactions/slash";
import { UserInteraction } from "./interactions/user";
import { MessageInteraction } from "./interactions/message";
import ButtonInteraction from "./interactions/button";
import SelectMenuInteraction from "./interactions/selectMenu";
import ModalInteraction from "./interactions/modal";
import { BaseChannel } from "./channels/base";
import { Guild } from "./guild";
import { EventEmitter } from "node:events";

export interface ClientOptions {
  token: string;
  intents: Intents[];
  getAllMembers?: boolean;
  debug?: boolean;
}

export interface ClientEvents {
  ready: [bot: ClientUser];
  "interaction.slash": [interaction: SlashInteraction];
  "interaction.user": [interaction: UserInteraction];
  "interaction.message": [interaction: MessageInteraction];
  "interaction.button": [interaction: ButtonInteraction];
  "interaction.selectmenu": [interaction: SelectMenuInteraction];
  "interaction.modal": [interaction: ModalInteraction];
  "guild.create": [guild: Guild];
}

export class Client extends EventEmitter {
  private options: ClientOptions;
  gateway: Gateway;
  rest: Rest;
  commands: CommandManger;
  user?: ClientUser;
  channels: Map<string, BaseChannel> = new Map();
  guilds: Map<string, Guild> = new Map();

  declare on: <K extends keyof ClientEvents>(
    event: K,
    listener: (...args: ClientEvents[K]) => void
  ) => this;
  declare once: <K extends keyof ClientEvents>(
    event: K,
    listener: (...args: ClientEvents[K]) => void
  ) => this;
  declare off: <K extends keyof ClientEvents>(
    event: K,
    listener: (...args: ClientEvents[K]) => void
  ) => this;
  declare emit: <K extends keyof ClientEvents>(event: K, ...args: ClientEvents[K]) => boolean;

  constructor(options: ClientOptions) {
    super();
    this.options = options;
    if (options.debug) Logger.debug = true;
    this.gateway = new Gateway(this, options);
    this.rest = new Rest(options.token);
    this.commands = new CommandManger(this);
  }

  connect() {
    return this.gateway.init();
  }

  close() {
    return this.gateway.close();
  }
}
