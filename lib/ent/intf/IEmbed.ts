export default interface IEmbed {
	title?: string;
	type?: string;
	description?: string;
	url?: string;
	timestamp?: string;
	color?: number;
	footer?: IEmbedFooter;
	image?: IEmbedImage;
	thumbnail?: IEmbedImage;
	video?: IEmbedVideo;
	provider?: IEmbedProvider;
	author?: IEmbedAuthor;
	fields?: IEmbedField[];
}
export interface IUnsentEmbed {
	title?: string;
	type: 'rich';
	description?: string;
	url?: string;
	color?: number;
	footer?: IEmbedFooter;
	image?: IEmbedImage;
	thumbnail?: IEmbedImage;
	provider?: IEmbedProvider;
	author?: IEmbedAuthor;
	fields?: IEmbedField[];
	setTitle(title: string): void
	addField(name: string, value: string, inline?: boolean): void
	addFields(fields: IEmbedField[]): void
	setFooter(text: string, icon_url?: string): void
	setImage(url: string): void
	setThumbnail(url: string): void
	setAuthor(name: string, icon_url?: string, url?: string): void
	setProvider(name: string, url: string): void
	// not allowed to set timestamp
	//setTimestamp(timestamp: string): void
	setColor(color: number): void
	setURL(url: string): void
	setDescription(description: string): void
}

export interface IEmbedFooter {
	text: string;
	icon_url?: string;
	proxy_icon_url?: string;
}

export interface IEmbedImage {
	url?: string;
	proxy_url?: string;
	height?: number;
	width?: number;
}

export interface IEmbedVideo {
	url?: string;
	proxy_url?: string;
	height?: number;
	width?: number;
}

export interface IEmbedProvider {
	name?: string;
	url?: string;
}

export interface IEmbedAuthor {
	name?: string;
	url?: string;
	icon_url?: string;
	proxy_icon_url?: string;
}

export interface IEmbedField {
	name: string;
	value: string;
	inline?: boolean;
}
