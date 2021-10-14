import { Intents } from '../const/discord/intents';

export interface IClientOptions {
	commandsDir?: string;
	// @NotImplemented
	isSharded?: boolean;

	discordWebsocket?: string;

	intents: Intents[];
	token: string;
	getAllMembers?: boolean;
}
