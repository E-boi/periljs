import IEmbed, {
    IEmbedAuthor,
    IEmbedField,
    IEmbedFooter,
    IEmbedImage,
    IEmbedProvider,
    IEmbedVideo,
    IUnsentEmbed
} from "../intf/IEmbed";
import Message from "./Message";

export default class Embed implements IUnsentEmbed, IEmbed
{
    title?: string;
	type: 'rich' = 'rich';
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

    constructor()
    {
        
    }

    public setTitle(title: string): void
    {
        this.title = title;
    }
    public static from(embed: IEmbed): Embed
    {
        const e = new Embed();
        e.title = embed.title;
        e.description = embed.description;
        e.url = embed.url;
        e.timestamp = embed.timestamp;
        e.color = embed.color;
        e.footer = embed.footer;
        e.image = embed.image;
        e.thumbnail = embed.thumbnail;
        e.video = embed.video;
        e.provider = embed.provider;
        e.author = embed.author;
        e.fields = embed.fields;
        return e;
    } 
    public static new(embed: IUnsentEmbed): Embed
    {
        const e = new Embed();
        e.title = embed.title;
        e.description = embed.description;
        e.url = embed.url;
        e.color = embed.color;
        e.footer = embed.footer;
        e.image = embed.image;
        e.thumbnail = embed.thumbnail;
        e.provider = embed.provider;
        e.author = embed.author;
        e.fields = embed.fields;
        return e;
    }
    public toDictionary(): IEmbed
    {
        if (!this.fields?.length && !this.title && !this.description)
        {
            throw new Error("You need to define some sort of content. [Embed]");
        }
        else if (!this.color)
        {
            this.color = 0x00ff00;
        }
        const e: IEmbed = {
            title: this.title,
            description: this.description,
            url: this.url,
            color: this.color,
            footer: this.footer,
            image: this.image,
            thumbnail: this.thumbnail,
            provider: this.provider,
            fields: this.fields,
            type: this.type,
        }
        return e;

    }
    public addField(name: string, value: string, inline?: boolean): void
    {
        if (!this.fields)
        {
            this.fields = [];
        }
        this.fields.push({
            name,
            value,
            inline
        });
    }
    public addFields(fields: IEmbedField[]): void
    {
        fields.forEach(f => this.addField(f.name, f.value, f.inline)); // never write the same code twice or the code swat team will call for your execution
    }
    public setFooter(text: string, icon_url?: string): void
    {
        this.footer = {
            text,
            icon_url
        };
    }
    public setImage(url: string): void
    {
        this.image = {
            url
        };
    }
    public setThumbnail(url: string): void
    {
        this.thumbnail = {
            url
        };
    }
    public setAuthor(name: string, icon_url?: string, url?: string): void
    {
        this.author = {
            name,
            icon_url,
            url
        };
    }
    public setProvider(name: string, url: string): void
    {
        this.provider = {
            name,
            url
        };
    }
    // not allowed to set timestamp
    // public setTimestamp(timestamp: string): void
    // {
    //     this.timestamp = timestamp;
    // }
    public setColor(color: number): void
    {
        this.color = color;
    }
    public setURL(url: string): void
    {
        this.url = url;
    }
    public setDescription(description: string): void
    {
        this.description = description;
    }

        
            

}