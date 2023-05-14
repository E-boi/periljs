import { RawSticker } from "./rawTypes";
import { StickerFormatTypes, StickerTypes } from "./enums";
import User from "./user";

export class PartialSticker {
  id: string;
  name: string;
  formatType: StickerFormatTypes;
  constructor(sticker: RawSticker) {
    this.id = sticker.id;
    this.name = sticker.name;
    this.formatType = sticker.format_type;
  }
}

export class Sticker extends PartialSticker {
  packId?: string;
  description?: string;
  tags: string;
  asset?: string;
  type: StickerTypes;
  available?: boolean;
  guildId?: string;
  user?: User;
  sortValue?: number;

  constructor(sticker: RawSticker) {
    super(sticker);
    this.id = sticker.id;
    this.packId = sticker.pack_id;
    this.description = sticker.description;
    this.tags = sticker.tags;
    this.type = sticker.type;
    this.available = sticker.available;
    this.guildId = sticker.guild_id;
    if (sticker.user) this.user = new User(sticker.user);
    this.sortValue = sticker.sort_value;
  }
}
