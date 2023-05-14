import { Client } from "../client";
import { RawChannel } from "../rawTypes";
import { VideoQualityModes } from "../enums";
import { BaseGuildTextableChannel } from "./baseGuildText";

export class VoiceChannel extends BaseGuildTextableChannel {
  bitrate?: number;
  userLimit?: number;
  rtcRegion?: string;
  video_quality_mode: VideoQualityModes;

  constructor(channel: RawChannel, client: Client) {
    super(channel, client);
    this.bitrate = channel.bitrate;
    this.userLimit = channel.user_limit;
    this.rtcRegion = channel.rtc_region;
    this.video_quality_mode = channel.video_quality_mode ?? VideoQualityModes.AUTO;
  }
}
