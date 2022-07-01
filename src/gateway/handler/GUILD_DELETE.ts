import Gateway from '..';
import { RawGuild } from '../../RawTypes';

export default (data: RawGuild, ws: Gateway, name: string) => {
  const guild = ws.client.guilds.get(data.id);
  if (!guild) return;
  ws.client.emit(name, data);
};
