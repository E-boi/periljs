import { Snowflake } from '../../const/Snowflake';
import { ICategoty } from '../../intf/IChannel';
import IOverwrite from '../../intf/IOverwrite';

export default class Category {
	id: Snowflake;
	name: string;
	type: 'GUILD_CATEGORY' = 'GUILD_CATEGORY';
	guildId: string;
	position: number;
	permissionOverwrites: IOverwrite[];
	constructor(channel: ICategoty) {
		this.id = new Snowflake(channel.id);
		this.name = channel.name;
		this.guildId = channel.guild_id;
		this.position = channel.position;
		this.permissionOverwrites = channel.permission_overwrites;
	}
}
