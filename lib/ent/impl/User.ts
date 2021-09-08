import { PremiumTypes, UserFlags } from '../../constants';
import { IUser } from '../intf/user/IUser';

export default class User {
	id: string;
	username: string;
	discriminator: string;
	avatar?: string;
	bot: boolean;
	system: boolean;
	mfa_enabled: boolean;
	locale?: string;
	flags?: UserFlags;
	premium_type?: keyof typeof PremiumTypes;
	public_flags?: UserFlags;
	constructor(user: IUser) {
		this.id = user.id;
		this.username = user.username;
		this.discriminator = user.discriminator;
		this.avatar = user.avatar;
		this.bot = user.bot ?? false;
		this.system = user.system ?? false;
		this.mfa_enabled = user.mfa_enabled ?? false;
		this.locale = user.locale;
		this.flags = user.flags;
		this.premium_type = user.premium_type && (PremiumTypes[user.premium_type] as any);
		this.public_flags = user.public_flags;
	}

	get tag() {
		return `${this.username}#${this.discriminator}`;
	}
}
