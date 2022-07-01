import { RawEmoji } from './RawTypes';
import { User } from './User';

/**
 * Emoji class
 */
export class Emoji {
  id?: string;
  name: string;
  roles?: string[];
  user?: User;
  requireColons?: boolean;
  managed?: boolean;
  animated?: boolean;
  available?: boolean;

  constructor(emoji: RawEmoji) {
    this.id = emoji.id;
    this.name = emoji.name;
    this.roles = emoji.roles;
    this.user = emoji.user && new User(emoji.user);
    this.requireColons = emoji.require_colons;
    this.managed = emoji.managed;
    this.animated = emoji.animated;
    this.available = emoji.available;
  }

  get url() {
    if (!this.id) return;
    const hash = `${this.animated ? 'a_' : ''}${this.id}`;
    const ext = this.animated ? '.gif' : '.webp';
    return `https://cdn.discordapp.com/emojis/${hash}${ext}`;
  }

  toString(): string {
    return this.id ? `${this.name}:${this.id}` : `${this.name}`;
  }

  toJSON(): RawEmoji {
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
