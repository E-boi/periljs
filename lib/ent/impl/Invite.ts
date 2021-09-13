import { Snowflake } from '../const/Snowflake';
import IInvite from '../intf/IInvite';
import Client from './client';
import User from './User';

export default class Invite {
	channelId: Snowflake;
	code: string;
	created_at: Date;
	guildId: Snowflake;
	inviter?: User;
	maxAge: number;
	maxUses: number;
	temporary: boolean;
	uses: number;
	private bot: Client;
	constructor(invite: IInvite, bot: Client) {
		this.channelId = new Snowflake(invite.channel_id);
		this.code = invite.code;
		this.created_at = new Date(invite.created_at);
		this.guildId = new Snowflake(invite.guild_id);
		this.inviter = invite.inviter && new User(invite.inviter);
		this.maxAge = invite.max_age;
		this.maxUses = invite.max_uses;
		this.temporary = invite.temporary;
		this.uses = invite.uses;
		this.bot = bot;
	}

	get channel() {
		return this.bot.channels.get(this.channelId.toString());
	}

	get guild() {
		return this.bot.guilds.get(this.guildId.toString());
	}

	toString() {
		return `https://discord.gg/${this.code}`;
	}
}

export class DeletedInvite {
	channelId: Snowflake;
	code: string;
	guildId: Snowflake;
	private bot: Client;
	constructor(invite: IInvite, bot: Client) {
		this.channelId = new Snowflake(invite.channel_id);
		this.code = invite.code;
		this.guildId = new Snowflake(invite.guild_id);
		this.bot = bot;
	}

	get channel() {
		return this.bot.channels.get(this.channelId.toString());
	}

	get guild() {
		return this.bot.guilds.get(this.guildId.toString());
	}

	toString() {
		return `https://discord.gg/${this.code}`;
	}
}
