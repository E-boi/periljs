import { IUser } from './user/IUser';

export default interface IInvite {
	channel_id: string;
	code: string;
	created_at: string;
	guild_id: string;
	inviter?: IUser;
	max_age: number;
	max_uses: number;
	temporary: boolean;
	uses: number;
}
