import Gateway from '..';

interface Data {
  guild_id: string;
  role_id: string;
}

export default (data: Data, ws: Gateway, name: string) => {
  const guild = ws.client.guilds.get(data.guild_id);
  const role = guild?.roles.get(data.role_id);
  if (!guild || !role) return;
  guild.roles.delete(role.id);
  ws.client.emit(name, role, guild);
};
