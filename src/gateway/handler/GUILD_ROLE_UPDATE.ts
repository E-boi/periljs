import Gateway from '..';
import { RawRole } from '../../RawTypes';
import { Role } from '../../Role';

interface Data {
  guild_id: string;
  role: RawRole;
}

export default (data: Data, ws: Gateway) => {
  const guild = ws.client.guilds.get(data.guild_id);
  const role = guild?.roles.get(data.role.id);
  if (!guild || !role) return;
  const updatedRole = new Role(data.role);
  guild.roles.set(updatedRole.id, updatedRole);
  ws.client.emit('guild.role.update', role, updatedRole, guild);
};
