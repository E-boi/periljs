import {
  RawPartialSticker,
  RawSticker,
  StickerFormatTypes,
  StickerTypes,
} from './RawTypes';
import { User } from './User';

export class Sticker {
  id: string;
  packId?: string;
  name: string;
  description?: string;
  tags: string;
  asset?: string;
  type: keyof typeof StickerTypes;
  formatType: keyof typeof StickerFormatTypes;
  available?: boolean;
  guildId?: string;
  user?: User;
  sortValue?: number;

  constructor(sticker: RawSticker) {
    this.id = sticker.id;
    this.packId = sticker.pack_id;
    this.name = sticker.name;
    this.description = sticker.description;
    this.tags = sticker.tags;
    this.asset = sticker.asset;
    this.type = StickerTypes[sticker.type] as keyof typeof StickerTypes;
    this.formatType = StickerFormatTypes[
      sticker.format_type
    ] as keyof typeof StickerFormatTypes;
    this.available = sticker.available;
    this.guildId = sticker.guild_id;
    this.user = sticker.user && new User(sticker.user);
    this.sortValue = sticker.sort_value;
  }
}

export class PartailSticker {
  id: string;
  name: string;
  formatType: keyof typeof StickerFormatTypes;
  constructor(sticker: RawPartialSticker) {
    this.id = sticker.id;
    this.name = sticker.name;
    this.formatType = StickerFormatTypes[
      sticker.format_type
    ] as keyof typeof StickerFormatTypes;
  }
}
