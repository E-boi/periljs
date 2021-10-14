import IEmoji from '../../intf/guild/IEmoji';
import User from '../User';

export default class Emoji {
	id?: string;
	name: string;
	roles?: string[];
	user?: User;
	requireColons?: boolean;
	managed?: boolean;
	animated?: boolean;
	available?: boolean;
	constructor(emoji: IEmoji) {
		this.id = emoji.id;
		this.name = emoji.name;
		this.roles = emoji.roles;
		this.user = emoji.user && new User(emoji.user);
		this.requireColons = emoji.require_colons;
		this.managed = emoji.managed;
		this.animated = emoji.animated;
		this.available = emoji.available;
	}

	toString() {
		console.log(encodeURI(this.name));
		if (this.id) return `<:${this.name}:${this.id}>`;
		else return `:${this.name}:`;
	}
}
