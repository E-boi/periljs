import Gateway from '..';
import { RawRole } from '../../RawTypes';
import { Role } from '../../Role';

interface Data {
  guild_id: string;
  role: RawRole;
}

export default (data: Data, ws: Gateway, name: string) => {
  const role = new Role(data.role);
  const guild = ws.client.guilds.get(data.guild_id);
  if (!guild) return;
  guild.roles.set(role.id, role);
  ws.client.emit(name, role, guild);
};
