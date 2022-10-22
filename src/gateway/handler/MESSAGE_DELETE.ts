import Gateway from '..';
import { RawMessage } from '../../RawTypes';

export default async (data: RawMessage, ws: Gateway) => {
  if (ws.client.user?.id === data.author?.id) return;
  const channel = ws.client.channels.get(data.channel_id);
  const message = channel?.messages.get(data.id);
  if (!channel || !message) return;
  channel?.messages.delete(message.id);
  ws.client.emit('message.delete', message);
};
