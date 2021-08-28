import { Intents } from "./intents";
import { Opcode } from "./opcodes";


/**
 * Discord Event Object
 * @date 8/8/2021 - 11:55:23 AM
 *
 * @export
 * @interface DiscordEvent
 * @typedef {DiscordEvent}
 */
export interface DiscordEvent {
    event: string;
    payload: object | any;
    op: Opcode;
    intent: Intents;
}