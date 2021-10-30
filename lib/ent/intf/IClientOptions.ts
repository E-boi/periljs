import { Intents } from '../const/discord/intents';
import { IClientCommandConfig } from './IClientConfig';

export interface IClientOptions {
	config?: IClientCommandConfig;
	commandsDir?: string;
	// @NotImplemented
	isSharded?: boolean;

	discordWebsocket?: string;

	intents: Intents[];
	token: string;
	getAllMembers?: boolean;
}
