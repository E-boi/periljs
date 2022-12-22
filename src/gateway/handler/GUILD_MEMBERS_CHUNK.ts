import Gateway from '..';
import { RawMember } from '../../RawTypes';
import { GuildMember } from '../../User';

interface Data {
  guild_id: string;
  members: RawMember[];
}

export default (data: Data, ws: Gateway) => {
  const guild = ws.client.guilds.get(data.guild_id);
  if (!guild) return;
  data.members.map(member =>
    guild.members.set(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      member.user!.id,
      new GuildMember(member, guild, ws.request)
    )
  );
  ws.client.emit('guild.members.chunk', guild);
};
