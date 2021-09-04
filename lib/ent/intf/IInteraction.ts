import { InteractionCallbackTypes, InteractionTypes } from '../const/discord/interaction';
import { Snowflake } from '../const/Snowflake';
import { ApplicationCommandTypes } from '../const/discord/interaction';
import { ComponentTypes } from '../const/discord/interaction';
import IGuildMember, { IPartialGuildMember } from './guild/IGuildMember';
import { IUser } from './user/IUser';
import IMessage, { IAllowedMention } from './IMessage';
import IRole from './guild/IRole';
import IChannel from './IChannel';
import { IApplicationCommandOption, IApplicationInteractionData } from './IApplicationCommand';
import IEmbed from './IEmbed';
import { IButtonComponent, ISelectMenuComponent } from './IComponent';

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
	values?: string[];
	target_id?: Snowflake;
}

export interface IResolvedData {
	users?: { [x: string]: IUser };
	members?: { [x: string]: IPartialGuildMember };
	roles?: { [x: string]: IRole };
	channels?: { [x: string]: IChannel };
	messages?: { [x: string]: IMessage };
}

export interface IInteractionResponse {
	type: InteractionCallbackTypes;
	data?: IInteractionCallbackData;
}
export interface IInteractionCallbackData {
	tts?: boolean;
	content?: string;
	embeds?: IEmbed[];
	allowed_mentions?: IAllowedMention;
	ephemeral?: boolean;
	components?: (IButtonComponent | ISelectMenuComponent)[][];
}

export interface ISlashCreate {
	type: 'CHAT_INPUT';
	name: string;
	description: string;
	options?: IApplicationCommandOption[];
	default_permission?: boolean;
}

export interface IUserCommandCreate {
	type: 'USER';
	name: string;
	default_permission?: boolean;
}

export interface IMessageCommandCreate {
	type: 'MESSAGE';
	name: string;
	default_permission?: boolean;
}

export interface ISlashCommand {
	id: Snowflake;
	name: string;
	type: 'CHAT_INPUT';
	resolved?: IInteractionData['resolved'];
	options?: IInteractionData['options'];
}

export interface IUserCommand {
	id: Snowflake;
	name: string;
	type: 'USER';
	resolved: IResolvedData;
	target_id: Snowflake;
}

export interface IMessageCommand {
	id: Snowflake;
	name: string;
	type: 'MESSAGE';
	resolved: IResolvedData;
	target_id: Snowflake;
}
