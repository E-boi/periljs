import { RawEmbed, RawEmbedField } from './RawTypes';

/**
 * @category Embed
 */
export class Embed {
  title?: string;
  description?: string;
  url?: string;
  color?: number;
  footer?: EmbedFooter;
  image?: EmbedImage;
  thumbnail?: EmbedThumbnail;
  video?: EmbedVideo;
  provider?: EmbedProvider;
  author?: EmbedAuthor;
  timestamp?: number;
  fields?: EmbedField[];

  constructor(embed?: EmbedOptions) {
    if (!embed) return;
    this.title = embed.title;
    this.url = embed.url;
    this.description = embed.description;
    this.color = embed.color;
    this.timestamp = embed.timestamp;
    this.fields = embed.fields;
    this.footer = embed.footer;
    this.image = embed.image;
    this.thumbnail = embed.thumbnail;
    this.provider = embed.provider && {
      url: embed.provider.url,
      name: embed.provider.name,
    };
    this.video = embed.video;
    this.author = embed.author;
  }

  static from(rawEmbed: RawEmbed) {
    const embed = new Embed({
      title: rawEmbed.title,
      url: rawEmbed.url,
      color: rawEmbed.color,
      description: rawEmbed.description,
    });

    if (rawEmbed.timestamp)
      embed.setTimestamp(new Date(rawEmbed.timestamp).getMilliseconds());
    if (rawEmbed.fields) embed.addFields(...rawEmbed.fields);
    if (rawEmbed.footer)
      embed.setFooter(rawEmbed.footer.text, rawEmbed.footer.icon_url);
    if (rawEmbed.image) embed.setImage(rawEmbed.image.url);
    if (rawEmbed.thumbnail) embed.setThumbnail(rawEmbed.thumbnail.url);
    if (rawEmbed.provider?.url && rawEmbed.provider.name)
      embed.setProvider(rawEmbed.provider.name, rawEmbed.provider.url);
    if (rawEmbed.video?.url) embed.setVideo(rawEmbed.video.url);
    if (rawEmbed.author)
      embed.setAuthor(
        rawEmbed.author.name,
        rawEmbed.author.url,
        rawEmbed.author.icon_url
      );

    return embed;
  }

  addFields(...fields: RawEmbedField[]): this {
    if (!this.fields) this.fields = [];
    this.fields.push(...fields);
    return this;
  }

  setFooter(text: string, iconUrl?: string): this {
    this.footer = { text, iconUrl };
    return this;
  }

  setImage(url: string): this {
    this.image = { url };
    return this;
  }

  setVideo(url: string): this {
    this.video = { url };
    return this;
  }

  setTitle(title: string): this {
    this.title = title;
    return this;
  }

  setThumbnail(url: string): this {
    this.thumbnail = { url };
    return this;
  }

  setProvider(name: string, url: string): this {
    this.provider = { name, url };
    return this;
  }

  setTimestamp(time: number): this {
    this.timestamp = time || Date.now();
    return this;
  }

  setColor(color: number): this {
    this.color = color;
    return this;
  }

  setURL(url: string): this {
    this.url = url;
    return this;
  }

  setDescription(description: string): this {
    this.description = description;
    return this;
  }

  setAuthor(name: string, url?: string, iconUrl?: string): this {
    this.author = { name, url, iconUrl };
    return this;
  }

  toJSON(): RawEmbed {
    return {
      title: this.title,
      description: this.description,
      author: this.author && {
        name: this.author.name,
        icon_url: this.author.iconUrl,
        url: this.author.url,
      },
      color: this.color,
      fields: this.fields,
      footer: this.footer && {
        text: this.footer.text,
        icon_url: this.footer.iconUrl,
      },
      image: this.image,
      provider: this.provider && {
        name: this.provider.name,
        url: this.provider.url,
      },
      thumbnail: this.thumbnail && {
        url: this.thumbnail.url,
      },
      timestamp: this.timestamp,
      type: 'rich',
      url: this.url,
      video: this.video && {
        url: this.video.url,
      },
    } as RawEmbed;
  }
}

/**
 * @category Embed
 */
export interface EmbedFooter {
  text: string;
  iconUrl?: string;
  proxyUrl?: string;
}

/** @internal */
interface BaseThingv2 {
  proxyUrl?: string;
  height?: number;
  width?: number;
}

/**
 * @category Embed
 */
export interface EmbedImage extends BaseThingv2 {
  url: string;
}

/**
 * @category Embed
 */
export interface EmbedThumbnail extends BaseThingv2 {
  url: string;
}

/**
 * @category Embed
 */
export interface EmbedVideo extends BaseThingv2 {
  url?: string;
}

/**
 * @category Embed
 */
export interface EmbedProvider {
  name?: string;
  url?: string;
}

/**
 * @category Embed
 */
export interface EmbedAuthor {
  name: string;
  url?: string;
  iconUrl?: string;
  proxyIconUrl?: string;
}

/**
 * @category Embed
 */
export interface EmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

/**
 * @category Embed
 */
export interface EmbedOptions {
  title?: string;
  description?: string;
  url?: string;
  color?: number;
  footer?: Omit<EmbedFooter, 'proxyUrl'>;
  image?: Omit<EmbedImage, 'proxyUrl' | 'height' | 'width'>;
  thumbnail?: Omit<EmbedThumbnail, 'proxyUrl' | 'height' | 'width'>;
  video?: Omit<EmbedVideo, 'proxyUrl' | 'height' | 'width'>;
  provider?: EmbedProvider;
  author?: Omit<EmbedAuthor, 'proxyUrl'>;
  timestamp?: number;
  fields?: EmbedField[];
}
