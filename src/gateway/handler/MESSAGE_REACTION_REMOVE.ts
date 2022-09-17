import Gateway from '..';
import { Emoji } from '../../Emoji';
import { RawEmoji } from '../../RawTypes';

interface Payload {
  user_id: string;
  channel_id: string;
  message_id: string;
  guild_id?: string;
  emoji: RawEmoji;
}

export default (data: Payload, ws: Gateway, name: string) => {
  const guild = data.guild_id && ws.client.guilds.get(data.guild_id);
  const channel = ws.client.channels.get(data.channel_id);
  const message = channel?.messages.get(data.message_id);
  if (!channel || !message) return;

  ws.client.emit(name, {
    emoji: new Emoji(data.emoji),
    channel,
    guild,
    message,
    userId: data.user_id,
  });
};
