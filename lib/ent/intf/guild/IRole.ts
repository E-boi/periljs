import { Permissions } from '../../const/discord/permissions';
import { Snowflake } from '../../const/Snowflake';

export default interface IRole {
	id: Snowflake;
	name: string;
	color: number;
	hoist: boolean;
	position: number;
	permissions: Permissions;
	managed: boolean;
	mentionable: boolean;
	tags: IRoleTags[];
}

export interface IRoleTags {
	bot_id?: Snowflake;
	integration_id?: Snowflake;
	premium_subscriber?: null;
}
