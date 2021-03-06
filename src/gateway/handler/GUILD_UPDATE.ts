import Gateway from '..';
import { Guild } from '../../Guild';
import { RawGuild } from '../../RawTypes';

export default (data: RawGuild, ws: Gateway, name: string) => {
  const oldGuild = ws.client.guilds.get(data.id);
  if (!oldGuild) return;
  const guild = new Guild(data, ws.request);
  ws.client.guilds.set(guild.id, guild);
  ws.client.emit(name, oldGuild, guild);
};
