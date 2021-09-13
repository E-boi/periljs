import { IUser } from '../user/IUser';

export default interface IEmoji {
	id: string;
	name: string;
	roles?: string[];
	user?: IUser;
	require_colons?: boolean;
	managed?: boolean;
	animated?: boolean;
	available?: boolean;
}
