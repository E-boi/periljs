import { Bitfield } from "../bitfield";
import { Client } from "../client";
import { RawChannel } from "../rawTypes";
import {
  ChannelFlags,
  ForumLayoutTypes,
  Permissions,
  SortOrderTypes,
  VideoQualityModes,
} from "../enums";
import { BaseChannel, PermissionOverwrite } from "./base";
import { DefaultReaction, ForumTag } from "./forum";
import { Guild } from "../guild";

interface EditChannel {
  name?: string;
  // type?: ChannelTypes.GUILD_TEXT | ChannelTypes.GUILD_ANNOUNCEMENT;
  position?: number;
  topic?: string;
  nsfw?: boolean;
  rateLimit?: number;
  bitrate?: number;
  userLimit?: number;
  overwrites?: PermissionOverwrite[];
  parentId?: string;
  videoQualityMode?: VideoQualityModes;
  defaultAutoArchiveDuration?: number;
  flags?: ChannelFlags[];
  tags?: ForumTag[];
  defaultReaction?: DefaultReaction;
  defaultThreadRateLimit?: number;
  defaultSortOrder?: SortOrderTypes;
  defaultForumLayout?: ForumLayoutTypes;
}

export class GuildChannel extends BaseChannel {
  name: string;
  topic?: string;
  position?: number;
  overwrites?: PermissionOverwrite[];
  parentId?: string;
  guildId?: string;
  /**
   * Only in the resolved field of {@link SlashInteraction}
   */
  permissions?: Bitfield<Permissions>;

  constructor(channel: RawChannel, client: Client) {
    super(channel, client);
    this.name = channel.name!;
    this.topic = channel.topic;
    this.guildId = channel.guild_id;
    this.position = channel.position;
    this.overwrites = channel.permission_overwrites?.map(
      (overwrite) => new PermissionOverwrite(overwrite)
    );
    this.parentId = channel.parent_id;
    if (channel.permissions) this.permissions = new Bitfield(parseInt(channel.permissions, 10));
  }

  get guild(): Guild | undefined {
    return this.guildId ? this.client.guilds.get(this.guildId) : undefined;
  }

  async edit(channel: EditChannel, reason?: string) {
    const res = await this.client.rest.modifyChannel(
      this.id,
      {
        available_tags: channel.tags?.map((t) => t.toJson()),
        bitrate: channel.bitrate,
        default_auto_archive_duration: channel.defaultAutoArchiveDuration,
        default_forum_layout: channel.defaultForumLayout,
        default_reaction_emoji: channel.defaultReaction?.toJson(),
        default_sort_order: channel.defaultSortOrder,
        default_thread_rate_limit_per_user: channel.defaultThreadRateLimit,
        flags: channel.flags?.reduce((a, b) => a + b),
        name: channel.name,
        nsfw: channel.nsfw,
        parent_id: channel.parentId,
        permission_overwrites: channel.overwrites?.map((o) => o.toJson()),
        position: channel.position,
        rate_limit_per_user: channel.rateLimit,
        topic: channel.topic,
        // type: channel.type,
        user_limit: channel.userLimit,
        video_quality_mode: channel.videoQualityMode,
      },
      reason
    );

    this.name = res.name!;
    this.topic = res.topic;
    this.position = res.position;
    this.overwrites = res.permission_overwrites?.map(
      (overwrite) => new PermissionOverwrite(overwrite)
    );
    if (res.flags) this.flags = new Bitfield(res.flags);
    // this.type = res.type
  }

  delete() {
    throw new Error("Method not implemented.");
  }

  fetchInvites() {
    throw new Error("Method not implemented.");
  }

  createInvite() {
    throw new Error("Method not implemented.");
  }
}
