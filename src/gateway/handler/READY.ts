import Gateway from '..';
import { RawUser } from '../../RawTypes';
import { User } from '../../User';

interface Data {
  user: RawUser;
  guilds: string[];
  session_id: string;
  resume_gateway_url: string;
}

export default (data: Data, ws: Gateway) => {
  const user = new User(data.user);
  ws.resumeGatewayUrl = data.resume_gateway_url;
  ws.sessionId = data.session_id;
  ws.client.user = user;
  ws.expectedGuilds = data.guilds;
  if (ws.status === 'connecting') ws.client.emit('ready', user);
  ws.status = 'connected';
};
