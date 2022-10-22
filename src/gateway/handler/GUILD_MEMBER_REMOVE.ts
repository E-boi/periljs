import Gateway from '..';
import { RawUser } from '../../RawTypes';

interface Data {
  guild_id: string;
  user: RawUser;
}

export default (data: Data, ws: Gateway) => {
  const guild = ws.client.guilds.get(data.guild_id);
  const member = guild?.members.get(data.user.id);
  if (!guild || !member) return;
  guild.members.delete(data.user.id);
  ws.client.emit('guild.member.remove', member, guild);
};
