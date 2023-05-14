import { Bitfield } from "../bitfield";
import { Client } from "../client";
import { RawChannel, RawOverwrite } from "../rawTypes";
import { ChannelFlags, ChannelTypes, OverwriteTypes, Permissions } from "../enums";
import { timestampFromSnowflake } from "../utils";
import { GuildChannel } from "./guild";
import { TextChannel } from "./text";
import { ThreadChannel } from "./thread";

export class PermissionOverwrite {
  id: string;
  type: OverwriteTypes;
  allow: Bitfield<Permissions>;
  deny: Bitfield<Permissions>;

  constructor(overwrite: RawOverwrite) {
    this.id = overwrite.id;
    this.type = overwrite.type;
    this.allow = new Bitfield(parseInt(overwrite.allow, 10));
    this.deny = new Bitfield(parseInt(overwrite.deny, 10));
  }

  toJson(): RawOverwrite {
    return {
      id: this.id,
      allow: this.allow.field.toString(),
      deny: this.deny.field.toString(),
      type: this.type,
    };
  }
}

export class BaseChannel {
  id: string;
  type: ChannelTypes;
  createdAt: Date;
  flags?: Bitfield<ChannelFlags>;
  protected client: Client;

  constructor(channel: RawChannel, client: Client) {
    this.id = channel.id;
    this.type = channel.type;
    this.createdAt = new Date(timestampFromSnowflake(this.id));
    if (channel.flags) this.flags = new Bitfield(channel.flags);
    this.client = client;
  }

  inGuild(): this is GuildChannel {
    return "guild" in this;
  }

  isText(): this is TextChannel {
    return this.type === ChannelTypes.GUILD_TEXT;
  }

  isThread(): this is ThreadChannel {
    return [ChannelTypes.PUBLIC_THREAD, ChannelTypes.PRIVATE_THREAD].includes(this.type);
  }

  toString() {
    return `<#${this.id}>`;
  }
}
