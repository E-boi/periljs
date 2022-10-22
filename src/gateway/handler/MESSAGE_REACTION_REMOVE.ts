import Gateway from '..';
import { BaseTextableChannel } from '../../Channel';
import { Emoji } from '../../Emoji';
import { RawEmoji } from '../../RawTypes';

interface Payload {
  user_id: string;
  channel_id: string;
  message_id: string;
  guild_id?: string;
  emoji: RawEmoji;
}

export default (data: Payload, ws: Gateway) => {
  const guild = data.guild_id && ws.client.guilds.get(data.guild_id);
  const channel = ws.client.channels.get(data.channel_id) as
    | BaseTextableChannel
    | undefined;
  const message = channel?.messages.get(data.message_id);
  if (!channel || !message || !guild) return;

  ws.client.emit('message.reaction.remove', {
    emoji: new Emoji(data.emoji),
    channel,
    guild,
    message,
    userId: data.user_id,
  });
};
