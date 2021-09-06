import { UserFlags } from '../../constants';
import { PremiumTypes } from '../const/discord/user/flags';
import { Snowflake } from '../const/Snowflake';
import { IPartialGuildMember } from '../intf/guild/IGuildMember';
import { IUser } from '../intf/user/IUser';
import { PartialGuildMember } from './guild/GuildMember';

export default class UserMention extends PartialGuildMember {
	id: Snowflake;
	username: string;
	discriminator: string;
	avatar?: string;
	bot?: boolean;
	system?: boolean;
	mfa_enabled?: boolean;
	locale?: string;
	flags?: UserFlags;
	premium_type?: PremiumTypes;
	public_flags?: UserFlags;
	verified?: boolean;
	email?: string;
	declare nick?: string;
	constructor(mention: IUser & IPartialGuildMember) {
		super(mention);
		this.id = new Snowflake(mention.id);
		this.username = mention.username;
		this.discriminator = mention.discriminator;
		this.avatar = mention.avatar;
		this.bot = mention.bot;
		this.system = mention.system;
		this.mfa_enabled = mention.mfa_enabled;
		this.locale = mention.locale;
		this.flags = mention.flags;
		this.premium_type = mention.premium_type;
		this.public_flags = mention.public_flags;
		this.verified = mention.verified;
		this.email = mention.email;
	}
}
