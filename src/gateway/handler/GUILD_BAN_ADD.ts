import Gateway from '..';
import { RawUser } from '../../RawTypes';
import { User } from '../../User';

interface Data {
  guild_id: string;
  user: RawUser;
}

export default (data: Data, ws: Gateway) => {
  const user = new User(data.user);
  ws.client.emit('guild.ban.add', { guildId: data.guild_id, user });
};
