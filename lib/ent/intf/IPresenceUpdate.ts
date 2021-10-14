import IActivity from './IActivity';
import IClientStatus from './IClientStatus';
import { IUser } from './user/IUser';

export default interface IPresenceUpdate {
	user: IUser;
	guild_id: string;
	status: string;
	activities: IActivity[];
	client_status: IClientStatus;
}
