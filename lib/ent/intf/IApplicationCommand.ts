import { ApplicationCommandOptionType, ApplicationCommandTypes } from '../const/discord/interaction';
import { Snowflake } from '../const/Snowflake';

export interface IApplicationCommand {
	id: Snowflake;
	type?: ApplicationCommandTypes;
	application_id: Snowflake;
	guild_id?: Snowflake;
	name: string;
	description: string;
	options?: IApplicationCommandOption[];
	default_permission?: boolean;
}

export interface IApplicationCommandOption {
	type: keyof typeof ApplicationCommandOptionType;
	name: string;
	description: string;
	required?: boolean;
	choices?: IApplicationCommandOptionChoice[];
	options?: IApplicationCommandOption[];
}

export interface IApplicationCommandOptionChoice {
	name: string;
	value: string | number;
}

export interface IApplicationInteractionData {
	name: string;
	type: ApplicationCommandOptionType;
	value?: any;
	options?: IApplicationInteractionData[];
}
