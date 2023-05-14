import { Bitfield } from "./bitfield.js";
import { Permissions } from "./enums.js";
import { RawRole } from "./rawTypes.js";

export class Role {
  id: string;
  name: string;
  color: number;
  hoist: boolean;
  icon?: string;
  unicodeEmoji?: string;
  position: number;
  permissions: Bitfield<Permissions>;
  managed: boolean;
  mentionable: boolean;

  constructor(role: RawRole) {
    this.id = role.id;
    this.name = role.name;
    this.color = role.color;
    this.hoist = role.hoist;
    this.unicodeEmoji = role.unicode_emoji;
    this.position = role.position;
    this.permissions = new Bitfield(parseInt(role.permissions, 10));
    this.managed = role.managed;
    this.mentionable = role.mentionable;
  }

  toString() {
    return `<@&${this.id}>`;
  }
}
