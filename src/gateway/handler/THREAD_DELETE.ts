import Gateway from '..';
import { ThreadChannel } from '../../Channel';
import { RawChannel } from '../../RawTypes';

export default (data: RawChannel, ws: Gateway) => {
  const thread = ws.client.channels.get(data.id);
  if (!thread) return;
  ws.client.emit('thread.delete', thread as ThreadChannel);
};
