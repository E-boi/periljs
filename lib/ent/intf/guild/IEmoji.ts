import { Snowflake } from '../../const/Snowflake';
import { IUser } from '../user/IUser';

export default interface IEmoji {
	id?: Snowflake;
	name?: string;
	roles?: Snowflake[];
	user?: IUser;
	require_colons?: boolean;
	managed?: boolean;
	animated?: boolean;
	available?: boolean;
}
