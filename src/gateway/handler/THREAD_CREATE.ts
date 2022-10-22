import Gateway from '..';
import { ThreadChannel } from '../../Channel';
import { RawChannel } from '../../RawTypes';

export default (data: RawChannel, ws: Gateway) => {
  const channel = new ThreadChannel(data, ws.request);
  ws.client.channels.set(channel.id, channel);
  ws.client.emit('thread.create', channel);
};
