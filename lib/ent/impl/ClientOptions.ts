import { Intents } from '../const/discord/intents';
import { IClientAuthentication } from '../intf/clientAuthentication';
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
	clientAuthentication: IClientAuthentication;
	constructor(
		clientAuthentication: IClientAuthentication,
		allowSlashCommands: boolean = false,
		commandsDir: string | undefined = undefined,
		isSharded: boolean = false,
		discordWebsocket: string | undefined = undefined,
		intents: Intents[] = [Intents.AllUnprivileged]
	) {
		this.allowSlashCommands = allowSlashCommands;
		this.commandsDir = commandsDir;
		this.isSharded = isSharded;
		this.discordWebsocket = discordWebsocket;
		this.intents = intents;
		this.clientAuthentication = clientAuthentication;
	}
}
