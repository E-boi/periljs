import Gateway from '..';
import { Message } from '../../Message';
import { RawMessage } from '../../RawTypes';

export default async (data: RawMessage, ws: Gateway, name: string) => {
  if (ws.client.user?.id === data.author?.id) return;
  const channel = ws.client.channels.get(data.channel_id);
  if (!channel) return;
  const oldMessage = channel?.messages.get(data.id);
  const message = new Message(data, ws.request);
  channel?.messages.set(message.id, message);
  ws.client.emit(name, oldMessage, message);
};
