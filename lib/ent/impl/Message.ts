import { Client, GuildMember } from '../../..';
import { MessageFlags, MessageTypes } from '../const/discord/message';
import { Snowflake } from '../const/Snowflake';
import { IStickerItem } from '../intf/guild/ISticker';
import IApplication from '../intf/IApplication';
import { IChannelMention } from '../intf/IChannel';
import IComponent from '../intf/IComponent';
import IEmbed from '../intf/IEmbed';
import IMessage, { IAttachment, IMessageActivity, IMessageCreate, IMessageIntercation, IMessageReference, IReaction } from '../intf/IMessage';
import { IUser } from '../intf/user/IUser';
import UserMention from './UserMention';
import { transformComponents } from './util/components';

export default class Message {
	id: string;
	channelId: Snowflake;
	author: IUser;
	content: string;
	timestamp: Date;
	tts: boolean;
	mentionEveryone: boolean;
	mentions: UserMention[];
	mentionRoles: Snowflake[];
	attachments: IAttachment[];
	embeds: IEmbed[];
	pinned: boolean;
	type: keyof typeof MessageTypes;
	guildId?: Snowflake;
	member?: GuildMember;
	editedTimestamp?: Date;
	mentionChannels?: IChannelMention[];
	reactions?: IReaction[];
	nonce?: number | string;
	webhookId?: Snowflake;
	activity?: IMessageActivity;
	application?: IApplication;
	applicationId?: Snowflake;
	message_reference?: IMessageReference;
	flags?: keyof typeof MessageFlags;
	referencedMessage?: IMessage;
	interaction?: IMessageIntercation;
	// thread?: IChannel;
	components?: IComponent[][];
	stickerItems?: IStickerItem[];
	private bot: Client;
	constructor(message: IMessage, bot: Client) {
		this.bot = bot;
		this.id = message.id;
		this.channelId = new Snowflake(message.channel_id);
		this.author = message.author;
		this.content = message.content;
		this.timestamp = new Date(message.timestamp);
		this.tts = message.tts;
		this.mentionEveryone = message.mention_everyone;
		this.mentions = message.mentions?.map(mention => new UserMention(mention));
		this.mentionRoles = message.mention_roles?.map(mention => new Snowflake(mention));
		this.attachments = message.attachments;
		this.embeds = message.embeds;
		this.pinned = message.pinned;
		this.type = MessageTypes[message.type] as keyof typeof MessageTypes;
		this.guildId = message.guild_id;
		this.member = this.guild?.members.get(message.author?.id);
		this.editedTimestamp = (message.edited_timestamp && new Date(message.edited_timestamp)) || undefined;
		this.mentionChannels = message.mention_channels;
		this.reactions = message.reactions;
		this.nonce = message.nonce;
		this.webhookId = message.webhook_id;
		this.activity = message.activity;
		this.application = message.application;
		this.applicationId = message.application_id;
		this.message_reference = message.message_reference;
		this.flags = message.flags && (MessageFlags[message.flags] as any);
		this.referencedMessage = message.referenced_message;
		this.interaction = message.interaction;
		this.components = message.components?.map(component => {
			return component.components.map(com => com);
		});
		this.stickerItems = message.sticker_items;
	}

	get channel() {
		const channel = this.bot.getChannelByID(this.channelId);
		if (!channel || (channel.type !== 'GUILD_TEXT' && channel.type !== 'DM' && channel.type !== 'GUILD_PUBLIC_THREAD')) return;
		return channel;
	}

	get guild() {
		return this.guildId && this.bot.guilds.get(this.guildId.toString());
	}

	async reply(message: IMessageCreate | string) {
		if (typeof message === 'string') message = { content: message };
		if (message.components) message.components = transformComponents(message.components);
		return this.bot.HTTP.sendMessage({ ...message, message_reference: { message_id: this.id } }, this.channelId.toString());
	}

	async createReaction(emoji: string) {
		if (!this.channel) return;
		return this.bot.HTTP.reactToMessage(this.channel.id.toString(), this.id, encodeURI(emoji));
	}

	async deleteReaction(emoji: string) {
		if (!this.channel) return;
		return this.bot.HTTP.deleteOwnReaction(this.channel.id.toString(), this.id, emoji);
	}
}
