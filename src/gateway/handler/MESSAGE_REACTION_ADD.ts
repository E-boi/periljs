import Gateway from '..';
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

export default (data: Payload, ws: Gateway, name: string) => {
  const channel = ws.client.channels.get(data.channel_id);
  const message = channel?.messages.get(data.message_id);
  if (!channel || !message) return;

  ws.client.emit(name, {
    emoji: new Emoji(data.emoji),
    channel,
    message,
    userId: data.user_id,
    member:
      data.member &&
      channel.inGuild() &&
      channel.guild &&
      new GuildMember(data.member, channel.guild, ws.request),
  });
};
