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
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    guild.members.set(member.user!.id, new GuildMember(member))
  );
};
