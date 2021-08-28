import { Opcodes, Closecodes, JSONcodes, Voicecodes } from "./ent/const/discord/opcodes";
import { Permissions } from "./ent/const/discord/permissions";
import { Intents } from "./ent/const/discord/intents";
import { UserFlags } from "./ent/const/discord/user/flags";
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
        
