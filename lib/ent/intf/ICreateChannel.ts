export interface ICreateTextChannel {
	name: string;
	type: 'GUILD_TEXT';
	topic?: string;
	rate_limit_per_user?: number;
	parent_id?: string;
	nsfw?: boolean;
}

export interface ICreateVoiceChannel {
	name: string;
	type: 'GUILD_VOICE';
	topic?: string;
	user_limit?: number;
	bitrate?: number;
	parent_id: string;
}

export interface ICreateCategory {
	name: string;
	type: 'GUILD_CATEGORY';
}
