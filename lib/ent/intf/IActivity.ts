import { ActivityFlags, ActivtyTypes } from '../const/discord/activity';
import { Snowflake } from '../const/Snowflake';
import IEmoji from './guild/IEmoji';

export default interface IActivity {
	name: string;
	type: ActivtyTypes;
	url?: string;
	created_at: number;
	timestamps: ITimestamps;
	application_id?: Snowflake;
	details?: string;
	state?: string;
	emoji?: IActivityEmoji;
	party?: IParty;
	assets?: IAssets;
	secrets: ISecrets;
	instance?: boolean;
	flags?: ActivityFlags;
	buttons?: IButton[];
}

export interface ITimestamps {
	start?: number;
	end?: number;
}

export interface IActivityEmoji {
	name: IEmoji['name'];
	id?: IEmoji['id'];
	animated?: IEmoji['animated'];
}

export interface IParty {
	id?: string;
	size?: number[];
}

export interface IAssets {
	large_image?: string;
	large_text?: string;
	small_image?: string;
	small_text?: string;
}

export interface ISecrets {
	join?: string;
	spectate?: string;
	match?: string;
}

export interface IButton {
	label: string;
	url: string;
}
