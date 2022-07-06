import Gateway from '..';
import { RawSticker } from '../../RawTypes';
import { Sticker } from '../../Sticker';

interface Data {
  guild_id: string;
  stickers: RawSticker[];
}

export default (data: Data, ws: Gateway, name: string) => {
  const guild = ws.client.guilds.get(data.guild_id);
  if (!guild) return;
  const stickers = data.stickers.map(sticker => new Sticker(sticker));
  stickers.forEach(sticker => guild.stickers.set(sticker.id, sticker));
  ws.client.emit(name, stickers, guild);
};
