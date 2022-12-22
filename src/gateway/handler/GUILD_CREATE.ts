import Gateway from '..';
import { Opcode } from '../../discord';
import { Guild } from '../../Guild';
import { RawGuild } from '../../RawTypes';

export default (data: RawGuild, ws: Gateway) => {
  const guild = new Guild(data, ws.request);
  ws.client.guilds.set(guild.id, guild);
  guild.channels.forEach(channel =>
    ws.client.channels.set(channel.id, channel)
  );
  if (ws.client.getAllMembers)
    ws.gateway?.send(
      JSON.stringify({
        op: Opcode.REQUEST_GUILD_MEMBERS,
        d: { guild_id: data.id, query: '', limit: 0 },
      })
    );
  // only emit guild.create when a guild is joined and not when the gateway sends guilds on start up
  if (ws.status === 'connected') ws.client.emit('guild.create', guild);
  else {
    ws.expectedGuilds.splice(
      ws.expectedGuilds.findIndex(id => id === guild.id)
    );
    if (
      !ws.expectedGuilds.length &&
      ws.client.user &&
      ws.status === 'connecting'
    ) {
      ws.status = 'connected';
      // fire the ready event when all the expected guild are sent to client
      ws.client.emit('ready', ws.client.user);
    }
  }
};
