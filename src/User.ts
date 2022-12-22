import { Opcode } from './discord';
import Gateway from './gateway';
import { Guild } from './Guild';
import HTTPS from './HTTPS';
import { Permission } from './Permission';
import {
  ActivityTypes,
  NitroTypes,
  RawMember,
  RawUser,
  StatusTypes,
  UserFlags,
} from './RawTypes';
import { Roles } from './Role';

export class User {
  id: string;
  username: string;
  discriminator: string;
  avatar?: string;
  bot?: boolean;
  system?: boolean;
  banner?: string;
  accentColor?: number;
  locale?: string;
  flags?: UserFlags;
  premiumType?: keyof typeof NitroTypes;
  publicFlags?: UserFlags;

  constructor(user: RawUser) {
    this.id = user.id;
    this.username = user.username;
    this.discriminator = user.discriminator;
    this.avatar = user.avatar;
    this.bot = user.bot;
    this.system = user.system;
    this.banner = user.banner;
    this.accentColor = user.accent_color;
    this.locale = user.locale;
    this.flags = user.flags;
    this.premiumType = user.premium_type
      ? (NitroTypes[user.premium_type] as keyof typeof NitroTypes)
      : undefined;
    this.publicFlags = user.public_flags;
  }

  get tag() {
    return `${this.username}#${this.discriminator}`;
  }

  toString(): string {
    return `<@${this.id}>`;
  }

  toJSON(): RawUser {
    return {
      discriminator: this.discriminator,
      id: this.id,
      username: this.username,
      accent_color: this.accentColor,
      avatar: this.avatar,
      banner: this.banner,
      bot: this.bot,
      flags: this.flags,
      locale: this.locale,
      premium_type: this.premiumType && NitroTypes[this.premiumType],
      public_flags: this.publicFlags,
      system: this.system,
    };
  }
}

export class PartialGuildMember {
  nick?: string;
  avatar?: string;
  boostingSince?: string;
  pending?: boolean;
  permissions?: Permission;
  timeoutUntil?: string;
  guild?: Guild;

  constructor(member: RawMember, guild?: Guild) {
    this.nick = member.nick;
    this.avatar = member.avatar;
    this.boostingSince = member.premium_since;
    this.pending = member.pending;
    this.permissions = member.permissions
      ? new Permission(member.permissions)
      : undefined;
    this.timeoutUntil = member.communication_disabled_until;
    this.guild = guild;
  }
}

export class GuildMember extends PartialGuildMember {
  user?: User;
  deaf: boolean;
  mute: boolean;
  roles: Roles;

  constructor(member: RawMember, guild: Guild, private request: HTTPS) {
    super(member, guild);
    this.user = member.user && new User(member.user);
    this.deaf = member.deaf;
    this.mute = member.mute;
    this.roles = new Roles(member.roles ?? [], this, guild, request);
  }

  edit(member: MemberEditOptions) {
    if (!this.user || !this.guild) return;
    return this.request.modifyGuildMember(this.guild.id, this.user.id, {
      ...member,
      communication_disabled_until: member.timeout?.toISOString(),
    });
  }

  get displayName(): string | undefined {
    return this.nick ?? this.user?.username;
  }

  toString(): string {
    return `<@${this.user?.id}>`;
  }
}

export class ClientUser extends User {
  presence: Presence;
  ws: Gateway;

  constructor(user: RawUser, presence: Presence, ws: Gateway) {
    super(user);
    this.presence = presence;
    this.ws = ws;
  }

  setActivies(...activities: Activity[]) {
    this.presence.activities = activities;
    this.ws.send({
      op: Opcode.PRESENCE_UPDATE,
      d: {
        since: 0,
        afk: false,
        status: this.presence.status,
        activities: activities.map(activity => ({
          name: activity.name,
          type: ActivityTypes[activity.type],
          url: activity.url,
        })),
      },
    });
  }

  setStatus(status: StatusTypes) {
    this.presence.status = status;
    this.ws.send({
      op: Opcode.PRESENCE_UPDATE,
      d: {
        since: null,
        afk: false,
        status,
        activities:
          this.presence.activities?.map(activity => ({
            name: activity.name,
            type: ActivityTypes[activity.type],
            url: activity.url,
          })) || [],
      },
    });
  }
}

export interface Activity {
  name: string;
  type: keyof typeof ActivityTypes;
  url?: string;
}

export interface Presence {
  status?: StatusTypes;
  activities?: Activity[];
}

interface MemberEditOptions {
  nick?: string;
  roles?: string[];
  mute?: boolean;
  deaf?: boolean;
  channelId?: string;
  timeout?: Date;
}
