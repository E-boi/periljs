import Gateway from '..';
import { ThreadMember } from '../../Channel';
import { RawThreadMember } from '../../RawTypes';

export default (data: RawThreadMember & { guild_id: string }, ws: Gateway) => {
  const member: ThreadMember & { guildId: string } = {
    flags: data.flags,
    guildId: data.guild_id,
    joinTimestamp: new Date(data.join_timestamp),
    id: data.id,
    userId: data.user_id,
  };

  ws.client.emit('thread.member.update', member);
};
