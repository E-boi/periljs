import Gateway from '..';
import { createChannel } from '../../Channel';
import { RawChannel } from '../../RawTypes';

export default (data: RawChannel, ws: Gateway, name: string) => {
  const thread = ws.client.channels.get(data.id);
  const updatedThread = createChannel(data, ws.request);
  if (!updatedThread || !thread) return;
  ws.client.channels.set(thread.id, updatedThread);
  ws.client.emit(name, thread, updatedThread);
};
