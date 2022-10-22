import Gateway from '..';
import { createChannel } from '../../Channel';
import { RawChannel } from '../../RawTypes';

export default (data: RawChannel, ws: Gateway) => {
  const channel = createChannel(data, ws.request);
  if (!channel) return;
  ws.client.channels.set(channel.id, channel);
  ws.client.emit('channel.create', channel);
};
