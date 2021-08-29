import { Intents } from '../const/discord/intents';
import { IClientAuthentication } from './clientAuthentication';

export interface IClientOptions {
	allowSlashCommands?: boolean;
	commandsDir?: string;
	// @NotImplemented
	isSharded?: boolean;

	discordWebsocket?: string;

	intents: Intents[];
	clientAuthentication: IClientAuthentication;
}
