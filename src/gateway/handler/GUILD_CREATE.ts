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
  ws.client.emit(name, guild);
};
