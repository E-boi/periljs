import { Gateway } from "..";
import GUILD_CREATE from "./GUILD_CREATE";
import INTERACTION_CREATE from "./INTERACTION_CREATE";
import READY from "./READY";
import RESUMED from "./RESUMED";

export default {
  READY,
  RESUMED,
  GUILD_CREATE,
  INTERACTION_CREATE,
} as Record<string, (data: unknown, gateway: Gateway) => void>;
