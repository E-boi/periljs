import { InteractionCallbackFlags, InteractionTypes } from '../../const/discord/interaction';
import { Snowflake } from '../../const/Snowflake';
import IInteraction, { IInteractionCallbackData } from '../../intf/IInteraction';
import Client from '../client';
import { transformComponents } from '../util/components';

export default class Interaction {
	type: keyof typeof InteractionTypes;
	id: IInteraction['id'];
	private token: IInteraction['token'];
	channelId: IInteraction['channel_id'];
	guildId: IInteraction['guild_id'];
	member: IInteraction['member'];
	user: IInteraction['user'];
	applicationId: IInteraction['application_id'];
	message: IInteraction['message'];
	readonly bot: Client;
	constructor(bot: Client, interaction: IInteraction) {
		this.type = InteractionTypes[interaction.type] as any;
		this.id = interaction.id;
		this.token = interaction.token;
		this.guildId = interaction.guild_id && new Snowflake(interaction.guild_id);
		this.channelId = interaction.channel_id;
		this.member = interaction.member;
		this.user = interaction.user;
		this.applicationId = interaction.application_id;
		this.message = interaction.message;
		this.bot = bot;
	}

	reply(content: IInteractionCallbackData | string) {
		if (typeof content === 'string')
			return this.bot.HTTP.post(`/interactions/${this.id}/${this.token}/callback`, JSON.stringify({ type: 4, data: { content } }));
		const reply: IInteractionCallbackData & { flags: InteractionCallbackFlags } = content as any;
		if (content.ephemeral) reply.flags = InteractionCallbackFlags.EPHEMERAL;
		if (reply.components) reply.components = transformComponents(reply.components);
		return this.bot.HTTP.post(`/interactions/${this.id}/${this.token}/callback`, JSON.stringify({ type: 4, data: reply }));
	}

	get guild() {
		if (!this.guildId) return undefined;
		return this.bot.getGuildByID(this.guildId);
	}

	get channel() {
		if (!this.channelId) return;
		const channel = this.bot.getChannelByID(this.channelId);
		if (!channel || (channel.type !== 'GUILD_TEXT' && channel.type !== 'DM')) return;
		return channel;
	}
}
