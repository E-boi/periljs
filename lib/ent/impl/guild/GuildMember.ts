import { Permissions } from '../../../constants';
import { Snowflake } from '../../const/Snowflake';
import IGuildMember, { IPartialGuildMember } from '../../intf/guild/IGuildMember';
import IThreadMember from '../../intf/IThreadMember';
import User from '../User';
import Guild from './Guild';

export class PartialGuildMember {
	nick?: string;
	roles: Snowflake[];
	joinedAt: Date;
	premiumSince?: Date;
	pending?: boolean;
	permissions: Permissions;
	constructor(member: IPartialGuildMember) {
		this.nick = member.nick;
		this.roles = member.roles.map(role => new Snowflake(role));
		this.joinedAt = new Date(member.joined_at);
		this.premiumSince = (member.premium_since && new Date(member.premium_since)) || undefined;
		this.pending = member.pending;
		this.permissions = member.permissions;
	}
}

export class GuildMember extends PartialGuildMember {
	user: User;
	deaf: boolean;
	mute: boolean;
	guild: Guild;
	constructor(member: IGuildMember, guild: Guild) {
		super(member as any);
		this.user = new User(member.user);
		this.deaf = member.deaf ?? false;
		this.mute = member.mute ?? false;
		this.guild = guild;
	}

	toString() {
		return `<@${this.user.id}>`;
	}

	async kick(reason?: string) {
		return this.guild.kick(this.user.id, reason);
	}

	async ban(reason?: string) {
		return this.guild.ban(this.user.id, reason);
	}
}

export class ThreadMember {
	id?: Snowflake;
	userId?: Snowflake;
	joinTimestamp: Date;
	flags: number;
	constructor(member: IThreadMember) {
		this.id = new Snowflake(member.id);
		this.userId = new Snowflake(member.id);
		this.joinTimestamp = new Date(member.join_timestamp);
		this.flags = member.flags;
	}

	toString() {
		return `<@${this.userId}>`;
	}
}
