import { Client } from "../client";
import { RawChannel, RawTreadMetadata } from "../rawTypes";
import { BaseGuildTextableChannel } from "./baseGuildText";
import { TextChannel } from "./text";

export class ThreadMetadata {
  archived: string;
  autoArchiveDuration: string;
  archiveTimestamp: string;
  locked: boolean;
  invitable?: boolean;
  createdTimestamp?: Date;

  constructor(metadata: RawTreadMetadata) {
    this.archived = metadata.archived;
    this.autoArchiveDuration = metadata.auto_archive_duration;
    this.archiveTimestamp = metadata.archive_timestamp;
    this.locked = metadata.locked;
    this.invitable = metadata.invitable;
    if (metadata.create_timestamp) this.createdTimestamp = new Date(metadata.create_timestamp);
  }
}

export class ThreadChannel extends BaseGuildTextableChannel {
  memberCount: number;
  messageCount: number;
  threadMetadata: ThreadMetadata;
  parentId: string;
  rateLimit: number;

  constructor(channel: RawChannel, client: Client) {
    super(channel, client);
    this.memberCount = channel.member_count!;
    this.messageCount = channel.message_count!;
    this.parentId = channel.parent_id!;
    this.rateLimit = channel.rate_limit_per_user!;
    this.threadMetadata = new ThreadMetadata(channel.thread_metadata!);
  }

  get parent(): TextChannel | undefined {
    return this.guild?.channels.get(this.parentId) as TextChannel;
  }
}

// export interface TreadMetadata {
//   achived: string;
//   autoArchiveDuration: string;
//   archiveTimestamp: string;
//   locked: boolean;
//   invitable?: boolean;
//   createdTimestamp?: string;
// }
