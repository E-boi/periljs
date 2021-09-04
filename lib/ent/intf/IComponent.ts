import { ComponentTypes } from '../const/discord/interaction';
import { ButtonStyles } from '../const/discord/message';
import IEmoji from './guild/IEmoji';

export default interface IComponent {
	type: keyof typeof ComponentTypes;
	custom_id?: string;
	disabled?: boolean;
	style?: keyof typeof ButtonStyles;
	label?: string;
	emoji?: IEmoji;
	url?: string;
	options?: ISelectOptions[];
	placeholder?: string;
	min_values?: number;
	max_values?: number;
}

export interface ISelectOptions {
	label: string;
	value: string;
	description?: string;
	emoji?: IEmoji;
	default?: boolean;
}

export interface IButtonComponent {
	type: 'Button';
	style: keyof typeof ButtonStyles;
	custom_id: string;
	label?: string;
	emoji?: IEmoji;
	url?: string;
	disabled?: string;
}

export interface ISelectMenuComponent {
	type: 'SelectMenu';
	custom_id: string;
	options: ISelectOption[];
	placeholder?: string;
	min_values?: number;
	max_values?: number;
	disabled?: boolean;
}

export interface ISelectOption {
	label: string;
	value: string;
	description?: string;
	emoji?: IEmoji;
	default?: boolean;
}

export interface ISelectMenuComponentData extends ISelectMenuComponent {
	values: string[];
}
