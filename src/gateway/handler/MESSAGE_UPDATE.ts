import Gateway from '..';
import { Message } from '../../Message';
import { RawMessage } from '../../RawTypes';

export default async (data: RawMessage, ws: Gateway) => {
  if (ws.client.user?.id === data.author?.id) return;
  const channel = ws.client.channels.get(data.channel_id);
  if (!channel) return;
  const oldMessage = channel?.messages.get(data.id);
  const message = new Message(data, ws.request);
  channel?.messages.set(message.id, message);
  if (!oldMessage) return;
  ws.client.emit('message.update', oldMessage, message);
};
