import { Intents } from '../const/discord/intents';
import { IClientCommandConfig } from '../intf/IClientConfig';
import { IClientOptions } from '../intf/IClientOptions';

/**
 * Client Options for the Discord Client.
 * @date 8/8/2021 - 11:31:55 AM
 *
 * @export
 * @class ClientOptions
 * @typedef {ClientOptions}
 * @implements {IClientOptions}
 */
export class ClientOptions implements IClientOptions {
	allowSlashCommands?: boolean | undefined;
	commandsDir?: string | undefined;
	isSharded?: boolean | undefined;
	discordWebsocket?: string | undefined;
	intents: Intents[];
	token: string;
	config?: IClientCommandConfig;
	constructor(
		token: string,
		allowSlashCommands: boolean = false,
		commandsDir: string | undefined = undefined,
		isSharded: boolean = false,
		discordWebsocket: string | undefined = undefined,
		intents: Intents[] = [Intents.AllUnprivileged],
		config?: IClientCommandConfig
	) {
		this.allowSlashCommands = allowSlashCommands;
		this.commandsDir = commandsDir;
		this.isSharded = isSharded;
		this.discordWebsocket = discordWebsocket;
		this.intents = intents;
		this.token = token;
		this.config = config;
	}
}
