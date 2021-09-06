import { MessageActivityTypes } from '../../constants';
import { InteractionTypes } from '../const/discord/interaction';
import { AllowedMentionTypes, MessageFlags, MessageTypes } from '../const/discord/message';
import { Snowflake } from '../const/Snowflake';
import IEmoji from './guild/IEmoji';
import { IPartialGuildMember } from './guild/IGuildMember';
import { IStickerItem } from './guild/ISticker';
import IApplication from './IApplication';
import IChannel, { IChannelMention } from './IChannel';
import IComponent from './IComponent';
import IEmbed from './IEmbed';
import { IButtonComponent, ISelectMenuComponent } from './IComponent';
import { IUser } from './user/IUser';

/**
 * Message object
 *
 * @interface IMessage
 * @typedef {IMessage}
 * @export
 */

export default interface IMessage {
	id: Snowflake;
	channel_id: string;
	guild_id?: Snowflake;
	author: IUser;
	member?: IPartialGuildMember;
	content: string;
	timestamp: string;
	edited_timestamp: string;
	tts: boolean;
	mention_everyone: boolean;
	mentions: (IPartialGuildMember & IUser)[];
	mention_roles: Snowflake[];
	mention_channels?: IChannelMention[];
	attachments: IAttachment[];
	embeds: IEmbed[];
	reactions?: IReaction[];
	nonce?: number | string;
	pinned: boolean;
	webhook_id?: Snowflake;
	type: MessageTypes;
	activity?: IMessageActivity;
	application?: IApplication;
	application_id?: Snowflake;
	message_reference?: IMessageReference;
	flags?: MessageFlags;
	referenced_message?: IMessage;
	interaction?: IMessageIntercation;
	thread?: IChannel;
	components?: { components: IComponent[] }[];
	sticker_items?: IStickerItem[];
}

/**
 * Message object to create a message
 *
 * @interface IMessageCreate
 * @typedef {IMessageCreate}
 * @export
 */

export interface IMessageCreate {
	content?: string;
	tts?: boolean;
	file?: Blob;
	embeds?: IEmbed[];
	allowed_mentions?: IAllowedMention;
	message_reference?: IMessageReference;
	components?: (IButtonComponent | ISelectMenuComponent)[][];
	sticker_ids?: string[];
}

/**
 * Attachment object
 *
 * @interface IAttachment
 * @typedef {IAttachment}
 * @export
 */

export interface IAttachment {
	id: Snowflake;
	filename: string;
	content_type?: string;
	size: number;
	url: string;
	proxy_url: string;
	height?: string;
	width?: string;
}

/**
 * Reaction Type
 *
 * @interface IReaction
 * @typedef {IReaction}
 */

export interface IReaction {
	count: number;
	me: boolean;
	emoji: IEmoji;
}

/**
 * Message Activity Type
 *
 * @interface IMessageActivity
 * @typedef {IMessageActivity}
 */

export interface IMessageActivity {
	type: MessageActivityTypes;
	party_id?: string;
}

/**
 * Message Reference Type (reply, crosspost, pin, etc)
 *
 * @interface IMessageReference
 * @typedef {IMessageReference}
 */

export interface IMessageReference {
	message_id?: Snowflake;
	channel_id?: Snowflake;
	guild_id?: Snowflake;
	fail_if_not_exists?: boolean;
}

/**
 * Message Interaction Type (if message is responce intercation)
 *
 * @interface IMessageIntercation
 * @typedef {IMessageIntercation}
 */

export interface IMessageIntercation {
	id: Snowflake;
	type: InteractionTypes;
	name: string;
	user: IUser;
}

export interface IAllowedMention {
	parse: AllowedMentionTypes;
	users?: Snowflake[];
	roles?: Snowflake[];
	replied_user?: boolean;
}
