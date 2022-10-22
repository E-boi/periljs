import Gateway from '..';
import { BaseTextableChannel } from '../../Channel';
import { Emoji } from '../../Emoji';
import { RawEmoji, RawMember } from '../../RawTypes';
import { GuildMember } from '../../User';

interface Payload {
  user_id: string;
  channel_id: string;
  message_id: string;
  guild_id?: string;
  member?: RawMember;
  emoji: RawEmoji;
}

export default (data: Payload, ws: Gateway) => {
  const guild = data.guild_id && ws.client.guilds.get(data.guild_id);
  const channel = ws.client.channels.get(data.channel_id) as
    | BaseTextableChannel
    | undefined;
  const message = channel?.messages.get(data.message_id);
  if (!channel || !message || !guild) return;

  ws.client.emit('message.reaction.add', {
    emoji: new Emoji(data.emoji),
    channel,
    message,
    userId: data.user_id,
    member:
      (data.member &&
        channel.inGuild() &&
        channel.guild &&
        new GuildMember(data.member, channel.guild, ws.request)) ||
      undefined,
    guild: guild,
  });
};
