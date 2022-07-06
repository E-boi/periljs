import Gateway from '..';
import { Emoji } from '../../Emoji';
import { RawEmoji } from '../../RawTypes';

interface Data {
  guild_id: string;
  emojis: RawEmoji[];
}

export default (data: Data, ws: Gateway, name: string) => {
  const guild = ws.client.guilds.get(data.guild_id);
  if (!guild) return;
  const emojis = data.emojis.map(emoji => new Emoji(emoji));
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  emojis.forEach(emoji => guild.emojis.set(emoji.id!, emoji));
  ws.client.emit(name, emojis, guild);
};
