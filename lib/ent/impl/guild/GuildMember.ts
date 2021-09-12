import { Permissions } from '../../../constants';
import { Snowflake } from '../../const/Snowflake';
import IGuildMember, { IPartialGuildMember } from '../../intf/guild/IGuildMember';
import User from '../User';

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
	constructor(member: IGuildMember) {
		super(member as any);
		this.user = new User(member.user);
		this.deaf = member.deaf ?? false;
		this.mute = member.mute ?? false;
	}

	toString() {
		return `<@${this.user.id}>`;
	}
}
