import { Snowflake } from '../../const/Snowflake';

export default interface IWelcomeScreen {
	description: string;
	welcome_channels: IWelcomeScreenChannel[];
}

export interface IWelcomeScreenChannel {
	channel_id: Snowflake;
	description: string;
	emoji_id?: Snowflake;
	emoji_name?: string;
}
