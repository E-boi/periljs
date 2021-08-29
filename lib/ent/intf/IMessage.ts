import { MessageActivityTypes } from '../../constants';
import { InteractionTypes } from '../const/discord/interaction';
import { MessageTypes } from '../const/discord/message';
import { Snowflake } from '../const/Snowflake';
import IEmoji from './guild/IEmoji';
import IGuildMember from './guild/IGuildMember';
import { IStickerItem } from './guild/ISticker';
import IApplication from './IApplication';
import IChannel, { IChannelMention } from './IChannel';
import IComponent from './IComponent';
import IEmbed from './IEmbed';
import { IUser } from './user/IUser';

export default interface IMessage {
	id: Snowflake;
	channel_id: Snowflake;
	guild_id?: Snowflake;
	author: IUser;
	member?: IGuildMember;
	content: string;
	timestamp: string;
	edited_timestamp: string;
	tts: boolean;
	mention_everyone: boolean;
	mentions: IUser[] & IGuildMember[];
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
	flags?: number;
	referenced_message?: IMessage;
	interaction?: IMessageIntercation;
	thread?: IChannel;
	components?: IComponent[];
	sticker_items?: IStickerItem[];
}

export interface IMessageCreate {
	content?: string;
	tts?: boolean;
	file?: Blob;
	embeds?: IEmbed[];
	allowed_mentions?: any; // IAllowedMention
	message_reference?: IMessageReference;
	components?: IComponent[];
	sticker_ids?: string[];
}

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

export interface IReaction {
	count: number;
	me: boolean;
	emoji: IEmoji;
}

export interface IMessageActivity {
	type: MessageActivityTypes;
	party_id?: string;
}

export interface IMessageReference {
	message_id?: Snowflake;
	channel_id?: Snowflake;
	guild_id?: Snowflake;
	fail_if_not_exists?: boolean;
}

export interface IMessageIntercation {
	id: Snowflake;
	type: InteractionTypes;
	name: string;
	user: IUser;
}
