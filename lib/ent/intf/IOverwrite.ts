import { Permissions } from '../const/discord/permissions';
import { Snowflake } from '../const/Snowflake';

export default interface IOverwrite {
	id: Snowflake;
	type: number;
	allow: Permissions;
	deny: Permissions;
}
