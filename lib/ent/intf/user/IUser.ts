import { PremiumTypes, UserFlags } from '../../const/discord/user/flags';

export interface IUser {
	id: string;
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

	/**
	 *
	 * @date 8/8/2021 - 11:34:41 AM
	 * @see https://peril.js.org/see/user-email-scoped-permissions
	 * @type {?boolean}
	 */
	verified?: boolean;
	/**
	 *
	 * @date 8/8/2021 - 11:34:41 AM
	 * @see https://peril.js.org/see/user-email-scoped-permissions
	 * @type {?string}
	 */
	email?: string;
}
