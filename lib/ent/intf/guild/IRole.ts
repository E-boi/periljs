import { Permissions } from '../../const/discord/permissions';

export default interface IRole {
	id: string;
	name: string;
	color: number;
	hoist: boolean;
	position: number;
	permissions: Permissions;
	managed: boolean;
	mentionable: boolean;
	tags?: IRoleTags;
}

export interface IRoleTags {
	bot_id?: string;
	integration_id?: string;
	premium_subscriber?: null;
}
