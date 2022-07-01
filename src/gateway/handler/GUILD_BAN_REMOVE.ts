import Gateway from '..';
import { RawUser } from '../../RawTypes';
import { User } from '../../User';

interface Data {
  guild_id: string;
  user: RawUser;
}

export default (data: Data, ws: Gateway, name: string) => {
  const user = new User(data.user);
  ws.client.emit(name, { guildId: data.guild_id, user });
};
