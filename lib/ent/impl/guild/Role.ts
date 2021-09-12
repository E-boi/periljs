import { Permissions } from '../../../constants';
import { Snowflake } from '../../const/Snowflake';
import IRole, { IRoleTags } from '../../intf/guild/IRole';

export default class Role {
	id: Snowflake;
	name: string;
	color: number;
	hoist: boolean;
	position: number;
	permissions: Permissions;
	managed: boolean;
	mentionable: boolean;
	tags?: RoleTag;
	constructor(role: IRole) {
		this.id = new Snowflake(role.id);
		this.name = role.name;
		this.color = role.color;
		this.hoist = role.hoist;
		this.position = role.position;
		this.permissions = role.permissions;
		this.managed = role.managed;
		this.mentionable = role.mentionable;
		this.tags = role.tags && new RoleTag(role.tags);
	}

	toString() {
		return `<@&${this.id}>`;
	}
}

export class RoleTag {
	botId?: Snowflake;
	integrationId?: Snowflake;
	premiumSubscriber?: null; // wtf discord
	constructor(tags: IRoleTags) {
		this.botId = new Snowflake(tags.bot_id);
		this.integrationId = new Snowflake(tags.integration_id);
		this.premiumSubscriber = tags.premium_subscriber;
	}
}
