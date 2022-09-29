import { Guild } from './Guild';
import HTTPS from './HTTPS';
import { Permission } from './Permission';
import { RawRole } from './RawTypes';
import { GuildMember } from './User';

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

export class Roles {
  cache: Map<string, Role> = new Map();
  private guild: Guild;
  private member: GuildMember;

  constructor(
    roles: string[],
    member: GuildMember,
    guild: Guild,
    private request: HTTPS
  ) {
    roles.forEach(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      id => guild.roles.has(id) && this.cache.set(id, guild.roles.get(id)!)
    );
    this.guild = guild;
    this.member = member;
  }

  async add(role: string | Role, reason?: string) {
    if (role instanceof Role) role = role.id;
    if (this.cache.has(role) || !this.member.user) return;
    await this.request.addGuildMemberRole(
      this.guild.id,
      this.member.user.id,
      role,
      reason
    );
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.cache.set(role, this.guild.roles.get(role)!);
  }

  async remove(role: string | Role, reason?: string) {
    if (role instanceof Role) role = role.id;
    if (!this.cache.has(role) || !this.member.user) return;
    await this.request.removeGuildMemberRole(
      this.guild.id,
      this.member.user.id,
      role,
      reason
    );
    this.cache.delete(role);
  }

  has(role: string | Role): boolean {
    if (role instanceof Role) role = role.id;
    return this.cache.has(role);
  }
}
