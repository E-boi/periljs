import { Opcodes, Closecodes, JSONcodes, Voicecodes } from "./ent/intf/discord/opcodes";
import { Permissions } from "./ent/intf/discord/permissions";
import { Intents } from "./ent/intf/discord/intents";
import { UserFlags } from "./ent/intf/discord/user/flags";
const WS_URI = "wss://gateway.discord.gg/?v=9&encoding=json";
export default {
    Opcodes,
    Closecodes,
    JSONcodes,
    Voicecodes,
    Permissions,
    Intents,
    UserFlags,
    WS_URI,
};
        