import { Permissions } from '../../const/discord/permissions';
import { Snowflake } from '../../const/Snowflake';
import { IUser } from '../user/IUser';

export interface IPartialGuildMember {
	nick?: string;
	roles: Snowflake[];
	joined_at: string;
	premium_since?: string;
	pending?: boolean;
	permissions: Permissions;
}

export default interface IGuildMember extends IPartialGuildMember {
	user: IUser;
	deaf: boolean;
	mute: boolean;
}
