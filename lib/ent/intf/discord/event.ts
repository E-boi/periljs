import { Intents } from "./intents";
import { Opcodes } from "./opcodes";
export
interface DiscordEvent {
    event: string;
    payload: object | any;
    op: Opcodes;
    intent: Intents;
}