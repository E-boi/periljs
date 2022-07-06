import Gateway from '..';

interface Data {
  guild_id?: string;
  channel_id: string;
  last_pin_timestamp?: string;
}

export default (data: Data, ws: Gateway, name: string) => {
  const channel = ws.client.channels.get(data.channel_id);
  if (!channel || !channel.isTextable()) return;
  const time = data.last_pin_timestamp
    ? new Date(data.last_pin_timestamp)
    : undefined;
  channel.lastPinTimestamp = time;
  ws.client.emit(name, channel, time);
};
