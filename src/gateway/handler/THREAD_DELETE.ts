import Gateway from '..';
import { RawChannel } from '../../RawTypes';

export default (data: RawChannel, ws: Gateway, name: string) => {
  const thread = ws.client.channels.get(data.id);
  if (!thread) return;
  ws.client.emit(name, data);
};
