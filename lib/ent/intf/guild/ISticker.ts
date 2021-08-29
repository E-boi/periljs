import { StickerFormatTypes, StickerTypes } from '../../const/discord/guild/sticker';
import { Snowflake } from '../../const/Snowflake';
import { IUser } from '../user/IUser';

export default interface ISticker {
	id: Snowflake;
	pack_id?: Snowflake;
	name: string;
	description: string;
	tags: string;
	type: StickerTypes;
	format_type: StickerFormatTypes;
	available?: boolean;
	guild_id?: Snowflake;
	user?: IUser;
	sort_value?: number;
}

export interface IStickerItem {
	id: Snowflake;
	name: string;
	format_type: StickerFormatTypes;
}
