import Gateway from '..';
import { RawUser } from '../../RawTypes';
import { User } from '../../User';

interface Data {
  user: RawUser;
  session_id: string;
}

export default (data: Data, ws: Gateway, name: string) => {
  const user = new User(data.user);
  ws.client.user = user;
  ws.client.emit(name, user);
};
