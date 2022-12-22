import Gateway from '..';
import { RawUser } from '../../RawTypes';
import { ClientUser } from '../../User';

interface Data {
  user: RawUser;
  guilds: string[];
  session_id: string;
  resume_gateway_url: string;
}

export default (data: Data, ws: Gateway) => {
  const user = new ClientUser(data.user, ws.options.presence, ws);
  ws.resumeGatewayUrl = data.resume_gateway_url;
  ws.sessionId = data.session_id;
  ws.client.user = user;
  ws.expectedGuilds = data.guilds;
  if (ws.status === 'connected' || !ws.expectedGuilds.length)
    // fire the ready event when all the expected guild are sent to client
    ws.client.emit('ready', user);
};
