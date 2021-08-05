import { Intents } from './discord/intents';
import { clientAuthentication } from './clientAuthentication';

export interface ClientOptions {
    allowSlashCommands: boolean| undefined;
    commandsDir: string | undefined;
    // @NotImplemented
    isSharded: boolean | undefined;

    discordWebsocket: string | undefined;

    intents: Intents | undefined;
    clientAuthentication: clientAuthentication;

    
}