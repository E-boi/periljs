import { createChannel } from '../../Channel';
import { RawChannel } from '../../RawTypes';
import Gateway from '..';

export default (data: RawChannel, ws: Gateway, name: string) => {
  const channel =
    ws.client.channels.get(data.id) || createChannel(data, ws.request);
  if (!channel) return;
  ws.client.emit(name, channel);
};
