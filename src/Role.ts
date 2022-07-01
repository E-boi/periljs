import { Permission } from './Channel';
import { RawRole } from './RawTypes';

export class Role {
  id: string;
  name: string;
  color: number;
  hoist: boolean;
  icon?: string;
  unicodeEmoji?: string;
  position: number;
  permissions: Permission;
  managed: boolean;
  mentionable: boolean;

  constructor(role: RawRole) {
    this.id = role.id;
    this.name = role.name;
    this.color = role.color;
    this.hoist = role.hoist;
    this.unicodeEmoji = role.unicode_emoji;
    this.position = role.position;
    this.permissions = new Permission(role.permissions, role.id);
    this.managed = role.managed;
    this.mentionable = role.mentionable;
  }

  toString() {
    return `<@&${this.id}>`;
  }
}
