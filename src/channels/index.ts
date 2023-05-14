import { Client } from "../client";
import { ChannelTypes } from "../enums";
import { RawChannel } from "../rawTypes";
import { TextChannel } from "./text";
import { ThreadChannel } from "./thread";
import { VoiceChannel } from "./voice";

export * from "./base";
export * from "./baseGuildText";
export * from "./baseGuildText";
export * from "./forum";
export * from "./guild";
export * from "./text";
export * from "./voice";

export function createChannel(channel: RawChannel, client: Client) {
  switch (channel.type) {
    case ChannelTypes.GUILD_TEXT:
      return new TextChannel(channel, client);
    case ChannelTypes.GUILD_VOICE:
      return new VoiceChannel(channel, client);
    // case ChannelTypes.DM:
    // case ChannelTypes.GROUP_DM:
    // case ChannelTypes.GUILD_CATEGORY:
    // case ChannelTypes.GUILD_ANNOUNCEMENT:
    // case ChannelTypes.ANNOUNCEMENT_THREAD:
    case ChannelTypes.PUBLIC_THREAD:
    case ChannelTypes.PRIVATE_THREAD:
      return new ThreadChannel(channel, client);
    // case ChannelTypes.GUILD_STAGE_VOICE:
    // case ChannelTypes.GUILD_DIRECTORY:
    // case ChannelTypes.GUILD_FORUM:
    default:
      return null;
  }
}
