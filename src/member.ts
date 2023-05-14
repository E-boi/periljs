import { Bitfield } from "./bitfield";
import { RawGuildMember } from "./rawTypes";
import { GuildMemberFlags, Permissions } from "./enums";
import User from "./user";
import { Role } from "./role";
import { Guild } from "./guild";
import { Client } from "./client";

export class Roles {
  private roles: Map<string, Role> = new Map();
  private guild: Guild;
  private client: Client;

  constructor(roles: Role[], guild: Guild, client: Client) {
    roles.forEach((r) => this.roles.set(r.id, r));

    this.guild = guild;
    this.client = client;
  }
}

export class GuildMember {
  user?: User;
  nick?: string;
  avatar?: string;
  roles: Roles;
  joinedAt: Date;
  premiumSince?: Date;
  deaf: boolean;
  mute: boolean;
  flags: Bitfield<GuildMemberFlags>;
  permissions?: Bitfield<Permissions>;
  communicationDisabledUntil?: Date;

  constructor(member: RawGuildMember, guild: Guild, client: Client) {
    if (member.user) this.user = new User(member.user);
    this.nick = member.nick;
    this.joinedAt = new Date(member.joined_at);
    if (member.premium_since) this.premiumSince = new Date(member.premium_since);
    this.deaf = member.deaf;
    this.mute = member.mute;
    this.flags = new Bitfield(member.flags);
    if (member.permissions) this.permissions = new Bitfield(parseInt(member.permissions, 10));
    this.roles = new Roles(
      member.roles?.filter((r) => guild.roles.has(r))?.map((r) => guild.roles.get(r)!) ?? [],
      guild,
      client
    );
  }

  get displayName(): string | undefined {
    return this.nick ?? this.user?.username;
  }

  toString(): string {
    return `<@${this.user?.id}>`;
  }
}
