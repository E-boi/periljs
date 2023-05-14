import { RawEmoji } from "./rawTypes";
import User from "./user";

interface EmojiFields {
  id?: string;
  name?: string;
  animated?: boolean;
}

export class Emoji {
  id?: string;
  name?: string;
  roles?: string[];
  user?: User;
  requireColons?: boolean;
  managed?: boolean;
  animated?: boolean;
  available?: boolean;

  constructor(emoji: EmojiFields) {
    this.id = emoji.id;
    this.name = emoji.name;
    this.animated = emoji.animated;
  }

  static from(emoji: RawEmoji) {
    const e = new Emoji({ id: emoji.id, animated: emoji.animated, name: emoji.name });
    e.roles = emoji.roles;
    e.user = emoji.user && new User(emoji.user);
    e.requireColons = emoji.require_colons;
    e.managed = emoji.managed;
    e.available = emoji.available;

    return e;
  }

  get url() {
    if (!this.id) return null;
    const hash = `${this.animated ? "a_" : ""}${this.id}`;
    const ext = this.animated ? ".gif" : ".webp";
    return `https://cdn.discordapp.com/emojis/${hash}${ext}`;
  }

  toString(): string {
    return this.id ? `${this.name}:${this.id}` : `${this.name}`;
  }

  toJson(): RawEmoji {
    return {
      name: this.name,
      animated: this.animated,
      available: this.available,
      id: this.id,
      managed: this.managed,
      require_colons: this.requireColons,
      roles: this.roles,
      user: this.user?.toJSON(),
    };
  }
}
