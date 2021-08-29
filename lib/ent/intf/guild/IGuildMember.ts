import { Permissions } from '../../const/discord/permissions';
import { Snowflake } from '../../const/Snowflake';
import { IUser } from '../user/IUser';

export default interface IGuildMember {
	user?: IUser;
	nick?: string;
	roles: Snowflake[];
	joined_at: string;
	premium_since?: string;
	deaf: boolean;
	mute: boolean;
	pending?: boolean;
	permissions: Permissions;
}
