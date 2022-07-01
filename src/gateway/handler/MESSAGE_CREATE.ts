import Gateway from '..';
import { createChannel } from '../../Channel';
import { Message } from '../../Message';
import { RawMessage } from '../../RawTypes';

export default async (data: RawMessage, ws: Gateway, name: string) => {
  if (ws.client.user?.id === data.author?.id) return;
  if (!ws.client.channels.has(data.channel_id)) {
    const rawChannel = await ws.request.getChannel(data.channel_id);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const channel = createChannel(rawChannel, ws.request)!;
    ws.client.channels.set(channel.id, channel);
  }
  const message = new Message(data, ws.request);
  ws.client.emit(name, message);
};
