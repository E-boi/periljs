import { RawUser } from "./rawTypes";
import { NitroTypes, UserFlags } from "./enums";

export default class User {
  id: string;
  username: string;
  avatar?: string;
  bot?: boolean;
  system?: boolean;
  banner?: string;
  accentColor?: number;
  locale?: string;
  flags?: UserFlags;
  premiumType?: NitroTypes;
  publicFlags?: UserFlags;

  constructor(user: RawUser) {
    this.id = user.id;
    this.username = user.username;
    this.avatar = user.avatar;
    this.bot = user.bot;
    this.system = user.system;
    this.banner = user.banner;
    this.accentColor = user.accent_color;
    this.locale = user.locale;
    this.flags = user.flags;
    this.premiumType = user.premium_type;
    this.publicFlags = user.public_flags;
  }

  toString(): string {
    return `<@${this.id}>`;
  }

  toJSON(): RawUser {
    return {
      id: this.id,
      username: this.username,
      accent_color: this.accentColor,
      avatar: this.avatar,
      banner: this.banner,
      bot: this.bot,
      flags: this.flags,
      locale: this.locale,
      premium_type: this.premiumType,
      public_flags: this.publicFlags,
      system: this.system,
    };
  }
}
