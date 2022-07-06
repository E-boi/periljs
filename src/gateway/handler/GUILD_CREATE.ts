import Gateway from '..';
import { Opcode } from '../../discord';
import { Guild } from '../../Guild';
import { RawGuild } from '../../RawTypes';

export default (data: RawGuild, ws: Gateway, name: string) => {
  const guild = new Guild(data, ws.request);
  ws.client.guilds.set(guild.id, guild);
  guild.channels.forEach(channel =>
    ws.client.channels.set(channel.id, channel)
  );
  if (ws.client.getAllMembers)
    ws.send(
      JSON.stringify({
        op: Opcode.REQUEST_GUILD_MEMBERS,
        d: { guild_id: data.id, query: '', limit: 0 },
      })
    );
  // only emit guild.create when a guild is joined and not when the bot starts up
  if (ws.connected) ws.client.emit(name, guild);
  else {
    ws.expectedGuilds.splice(
      ws.expectedGuilds.findIndex(id => id === guild.id)
    );
    if (!ws.expectedGuilds.length) ws.connected = true;
  }
};
