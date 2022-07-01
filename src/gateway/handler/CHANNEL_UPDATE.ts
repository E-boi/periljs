import Gateway from '..';
import { createChannel } from '../../Channel';
import { RawChannel } from '../../RawTypes';

export default (data: RawChannel, ws: Gateway, name: string) => {
  const channel = ws.client.channels.get(data.id);
  const updatedChannel = createChannel(data, ws.request);
  if (!updatedChannel || !channel) return;
  ws.client.channels.set(channel.id, updatedChannel);
  ws.client.emit(name, channel, updatedChannel);
};
