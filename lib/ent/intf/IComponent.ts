import { ComponentTypes } from '../const/discord/interaction';
import IEmoji from './guild/IEmoji';

export default interface IComponent {
	type: ComponentTypes;
	custom_id?: string;
	disabled?: boolean;
	style?: number;
	label?: string;
	emoji?: IEmoji;
	url?: string;
	options?: ISelectOptions;
	placeholder?: string;
	min_values?: number;
	max_values?: number;
	components?: IComponent[];
}

export interface ISelectOptions {
	label: string;
	value: string;
	description?: string;
	emoji?: IEmoji;
	default?: boolean;
}
