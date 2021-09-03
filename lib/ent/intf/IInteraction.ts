import { InteractionCallbackFlags, InteractionCallbackTypes, InteractionTypes } from '../const/discord/interaction';
import { Snowflake } from '../const/Snowflake';
import { ApplicationCommandTypes } from '../const/discord/interaction';
import { ComponentTypes } from '../const/discord/interaction';
import IGuildMember from './guild/IGuildMember';
import { IUser } from './user/IUser';
import IMessage, { IAllowedMention } from './IMessage';
import IRole from './guild/IRole';
import IChannel from './IChannel';
import { IApplicationCommandOption, IApplicationInteractionData } from './IApplicationCommand';
import IEmoji from './guild/IEmoji';
import IEmbed from './IEmbed';
import IComponent from './IComponent';

export default interface IInteraction {
	id: Snowflake;
	application_id: Snowflake;
	type: InteractionTypes;
	data?: IInteractionData;
	guild_id?: Snowflake;
	channel_id?: Snowflake;
	member?: IGuildMember;
	user?: IUser;
	token: string;
	readonly version: number;
	message?: IMessage;
}

export interface IInteractionData {
	id: Snowflake;
	name: string;
	type: ApplicationCommandTypes;
	resolved?: IResolvedData;
	options?: IApplicationInteractionData[];
	custom_id?: string;
	component_type?: ComponentTypes;
	values?: ISelectOption[];
	target_id?: Snowflake;
}

export interface IResolvedData {
	users?: { [x: string]: IUser };
	members?: Map<Snowflake | string, IGuildMember>;
	roles?: Map<Snowflake | string, IRole>;
	channels?: Map<Snowflake | string, IChannel>;
	messages?: Map<Snowflake | string, IMessage>;
}

export interface ISelectOption {
	label: string;
	value: string;
	description?: string;
	emoji?: IEmoji;
	default?: boolean;
}

export interface IInteractionResponse {
	type: InteractionCallbackTypes;
	data?: IInteractionCallbackData;
}

export interface IInteractionCreate {
	type: keyof typeof ApplicationCommandTypes;
	name: string;
	description: string;
	options?: IApplicationCommandOption[];
	default_permission?: boolean;
}

export interface IInteractionCallbackData {
	tts?: boolean;
	content?: string;
	embeds?: IEmbed[];
	allowed_mentions?: IAllowedMention;
	ephemeral?: boolean;
	components?: IComponent[];
}

export interface IInteractionCommand {
	id: Snowflake;
	name: string;
	type: InteractionTypes;
	resolved?: IInteractionData['resolved'];
	options?: IInteractionData['options'];
}
