import { Gateway } from "..";
import { Guild } from "../../guild";
import { RawChannel, RawGuild, RawGuildMember } from "../../rawTypes";

interface Payload {
  joined_at: string;
  unavailable?: boolean;
  member_count: number;
  members: RawGuildMember[];
  channels: RawChannel[];
  threads: RawChannel[];
}

export default function GUILD_CREATE(data: RawGuild & Payload, gateway: Gateway) {
  const guild = new Guild(data, gateway.client);
  [...guild.channels, ...guild.threads].forEach((c) => gateway.client.channels.set(c[0], c[1]));
  gateway.client.guilds.set(guild.id, guild);

  if (!gateway.expectedGuilds?.some((id) => guild.id === id))
    gateway.client.emit("guild.create", guild);

  if (gateway.expectedGuilds) {
    const idx = gateway.expectedGuilds!.findIndex((g) => g === data.id);

    if (idx !== -1) gateway.expectedGuilds!.splice(idx, 1);

    if (gateway.expectedGuilds!.length === 0) {
      if (gateway.status === "connecting") gateway.client.emit("ready", gateway.client.user!);

      gateway.status = "connected";
    }
  } else if (gateway.status === "connecting") {
    gateway.client.emit("ready", gateway.client.user!);
    gateway.status = "connected";
  }
}
