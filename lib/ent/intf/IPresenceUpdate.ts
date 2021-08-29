import { Snowflake } from '../const/Snowflake';
import IActivity from './IActivity';
import IClientStatus from './IClientStatus';
import { IUser } from './user/IUser';

export default interface IPresenceUpdate {
	user: IUser;
	guild_id: Snowflake;
	status: string;
	activities: IActivity[];
	client_status: IClientStatus;
}
