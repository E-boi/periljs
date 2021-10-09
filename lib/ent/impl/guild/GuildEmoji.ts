import { Snowflake } from '../../const/Snowflake';
import IEmoji from '../../intf/guild/IEmoji';
import User from '../User';

export default class Emoji {
	id?: Snowflake;
	name: string;
	roles?: Snowflake[];
	user?: User;
	requireColons?: boolean;
	managed?: boolean;
	animated?: boolean;
	available?: boolean;
	constructor(emoji: IEmoji) {
		this.id = new Snowflake(emoji.id);
		this.name = emoji.name;
		this.roles = emoji.roles?.map(role => new Snowflake(role));
		this.user = emoji.user && new User(emoji.user);
		this.requireColons = emoji.require_colons;
		this.managed = emoji.managed;
		this.animated = emoji.animated;
		this.available = emoji.available;
	}

	toString() {
		if (this.id) return `<:${this.name}:${this.id}>`;
		else return `:${this.name}:`;
	}
}
