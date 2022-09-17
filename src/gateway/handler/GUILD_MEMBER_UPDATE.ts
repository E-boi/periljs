import Gateway from '..';
import { RawMember } from '../../RawTypes';
import { GuildMember } from '../../User';

export default (
  data: RawMember & { guild_id: string },
  ws: Gateway,
  name: string
) => {
  const guild = ws.client.guilds.get(data.guild_id);
  if (!guild) return;
  const oldMember = data.user && guild.members.get(data.user.id);
  const member = new GuildMember(data, guild, ws.request);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  guild.members.set(member.user!.id, member);
  ws.client.emit(name, oldMember, member);
};
