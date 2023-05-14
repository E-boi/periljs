import { Client } from "../client";
import { RawChannel } from "../rawTypes";
import { BaseGuildTextableChannel } from "./baseGuildText";
import { ThreadChannel } from "./thread";

export class TextChannel extends BaseGuildTextableChannel {
  lastPinTimestamp?: Date;
  nsfw?: boolean;
  rateLimit?: number;

  constructor(channel: RawChannel, client: Client) {
    super(channel, client);
    if (channel.last_pin_timestamp) this.lastPinTimestamp = new Date(channel.last_pin_timestamp);
    this.nsfw = channel.nsfw;
    this.rateLimit = channel.rate_limit_per_user;
  }

  async createThread(name: string, messageId?: string) {
    let channel: RawChannel;

    if (messageId)
      channel = await this.client.rest.createThreadFromMessage(this.id, messageId, { name });
    else channel = await this.client.rest.createThreadWithoutMessage(this.id, { name });

    const thread = new ThreadChannel(channel, this.client);

    this.guild?.threads.set(thread.id, thread);

    return thread;
  }
}
