import fetch, { HeaderInit, Response } from 'node-fetch';
import Client from './Client';
import { JSONcode } from './discord';
import {
  ChannelTypes,
  MessageFlags,
  RawAllowedMentions,
  RawChannel,
  RawEmbed,
  RawGuild,
  RawInteractionCallback,
  RawInteractionCommand,
  RawMember,
  RawMessage,
  RawMessageComponent,
  RawMessageReference,
  RawThreadMember,
  RawUser,
} from './RawTypes';

// this just makes it to the whole minified code of peril in thrown
class PerilError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Error';
    console.log(this.stack?.length);
    Object.setPrototypeOf(this, PerilError.prototype);
  }
}

/** @internal */
export default class HTTPS {
  private baseUrl: string;
  private headers: HeaderInit;
  readonly client: Client;

  constructor(token: string, client: Client) {
    this.baseUrl = 'https://discord.com/api/v10';
    this.client = client;
    this.headers = {
      'User-Agent': 'periljs (https://discord.gg/aCwa6nFj4z, v2)',
      'Content-Type': 'application/json',
      Authorization: `Bot ${token}`,
    };
  }

  async post(
    url: string,
    body: Record<string, unknown>,
    headers?: HeaderInit
  ): Promise<Response> {
    const res = await fetch(`${this.baseUrl}${url}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { ...this.headers, ...headers },
    });

    if (!res.ok) throw new PerilError(JSONcode[(await res.json()).code]);
    return res;
  }

  async patch(
    url: string,
    body: Record<string, unknown>,
    headers?: HeaderInit
  ): Promise<Response> {
    const res = await fetch(`${this.baseUrl}${url}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: { ...this.headers, ...headers },
    });

    if (!res.ok) throw new PerilError(JSONcode[(await res.json()).code]);
    return res;
  }

  async get(url: string, headers?: HeaderInit): Promise<Response> {
    const res = await fetch(`${this.baseUrl}${url}`, {
      method: 'GET',
      headers: { ...this.headers, ...headers },
    });

    if (!res.ok) throw new PerilError(JSONcode[(await res.json()).code]);
    return res;
  }

  async put(
    url: string,
    body?: Record<string, unknown>,
    headers?: HeaderInit
  ): Promise<Response> {
    const res = await fetch(`${this.baseUrl}${url}`, {
      method: 'PUT',
      body: JSON.stringify(body || {}),
      headers: { ...this.headers, ...headers },
    });

    if (!res.ok) throw new PerilError(JSONcode[(await res.json()).code]);
    return res;
  }

  async delete(url: string, headers?: HeaderInit): Promise<Response> {
    const res = await fetch(`${this.baseUrl}${url}`, {
      method: 'DELETE',
      headers: { ...this.headers, ...headers },
    });

    if (!res.ok) throw new PerilError(JSONcode[(await res.json()).code]);
    return res;
  }
  // guild related stuff here
  async getGuild(guildId: string): Promise<RawGuild> {
    const res = await this.get(`/guilds/${guildId}`);

    return (await res.json()) as RawGuild;
  }

  async getChannels(guildId: string): Promise<RawChannel[]> {
    const res = await this.get(`/guild/${guildId}/channels`);

    return (await res.json()) as RawChannel[];
  }

  async getActiveThreads(guildId: string): Promise<RawChannel[]> {
    const res = await this.get(`/guilds/${guildId}/threads/active`);

    const json: { threads: RawChannel[] } = await res.json();

    return json.threads;
  }

  async getMemeber(guildId: string, userId: string): Promise<RawMember> {
    const res = await this.get(`/guilds/${guildId}/members/${userId}`);

    return (await res.json()) as RawMember;
  }

  async getMembers(
    guildId: string,
    query?: { limit?: number; after?: string }
  ): Promise<RawMember[]> {
    let stringQ = '';
    if (query && query.limit) stringQ += `limit=${query.limit}&`;
    if (query && query.after) stringQ += `after=${query.after}`;

    const res = await this.get(
      `/guilds/${guildId}/members${stringQ ? '?' + stringQ : ''}`
    );

    return (await res.json()) as RawMember[];
  }

  async modifyGuildMember(
    guildId: string,
    userId: string,
    member: {
      nick?: string;
      roles?: string[];
      mute?: boolean;
      deaf?: boolean;
      channel_id?: string;
      communication_disabled_until?: string;
    },
    reason?: string
  ): Promise<undefined> {
    await this.patch(
      `/guilds/${guildId}/members/${userId}`,
      member,
      reason ? { 'X-Audit-Log-Reason': reason } : undefined
    );
    return;
  }

  async addGuildMemberRole(
    guildId: string,
    userId: string,
    roleId: string,
    reason?: string
  ): Promise<undefined> {
    await this.put(
      `/guilds/${guildId}/members/${userId}/roles/${roleId}`,
      undefined,
      reason ? { 'X-Audit-Log-Reason': reason } : undefined
    );
    return;
  }

  async removeGuildMemberRole(
    guildId: string,
    userId: string,
    roleId: string,
    reason?: string
  ): Promise<undefined> {
    await this.delete(
      `/guilds/${guildId}/members/${userId}/roles/${roleId}`,
      reason ? { 'X-Audit-Log-Reason': reason } : undefined
    );
    return;
  }

  // channel related stuff here

  async getChannel(channelId: string): Promise<RawChannel> {
    const res = await this.get(`/channels/${channelId}`);

    return (await res.json()) as RawChannel;
  }

  async triggerTyping(channelId: string) {
    await this.post(`/channel/${channelId}/typing`, {});
  }

  async createMessage(
    channelId: string,
    message: RawMessageOptions
  ): Promise<RawMessage> {
    if (!message.content && !message.embeds?.length && !message.sticker_ids)
      throw new PerilError(
        'Message Must include at least one of "content", "embeds", "sticker_ids", or "files".'
      );
    const res = await this.post(`/channels/${channelId}/messages`, {
      ...message,
    });

    return (await res.json()) as RawMessage;
  }

  async editMessage(
    channelId: string,
    messageId: string,
    message: RawMessageOptions
  ): Promise<RawMessage> {
    if (!message.content && !message.embeds?.length && !message.sticker_ids)
      throw new PerilError(
        'An edit Must include at least one of "content", "embeds", "sticker_ids", or "files".'
      );
    const res = await this.patch(
      `/channels/${channelId}/messages/${messageId}`,
      { ...message }
    );

    return (await res.json()) as RawMessage;
  }

  async getMessage(channelId: string, messageId: string): Promise<RawMessage> {
    const res = await this.get(`/channels/${channelId}/messages/${messageId}`);

    return (await res.json()) as RawMessage;
  }

  async getMessages(
    channelId: string,
    query: { limit?: number; around?: string; before?: string; after?: string }
  ): Promise<RawMessage[]> {
    let stringQ = '';

    if (query?.around) stringQ += `around=${query.around}&`;
    else if (query?.after) stringQ += `after=${query.after}&`;
    else if (query?.before) stringQ += `before=${query.before}&`;
    if (query?.limit) stringQ += `limit=${query.limit}`;

    const res = await this.get(
      `/channels/${channelId}/messages${stringQ ? '?' + stringQ : ''}`
    );

    return (await res.json()) as RawMessage[];
  }

  async deleteMessage(
    channelId: string,
    messageId: string,
    headers?: { 'X-Audit-Log-Reason': string }
  ) {
    await this.delete(`/channels/${channelId}/messages/${messageId}`, headers);
  }

  async deleteMessagesBulk(
    channelId: string,
    messagesId: string[],
    headers?: { 'X-Audit-Log-Reason': string }
  ) {
    if (messagesId.length < 2 || messagesId.length < 100)
      throw new PerilError(
        'To bulk deletes messages you need to include at least 2 messages and max is 100'
      );
    await this.post(
      `/channels/${channelId}/messages/bulk-delete`,
      {
        messages: messagesId,
      },
      headers
    );
  }

  async getPinMessage(channelId: string): Promise<RawMessage[]> {
    const res = await this.get(`/channels/${channelId}/pins`);

    return (await res.json()) as RawMessage[];
  }

  async pinMessage(
    channelId: string,
    messageId: string,
    headers?: { 'X-Audit-Log-Reason': string }
  ) {
    await this.put(
      `/channels/${channelId}/pins/${messageId}`,
      undefined,
      headers
    );
  }

  async unpinMessage(
    channelId: string,
    messageId: string,
    headers?: { 'X-Audit-Log-Reason': string }
  ) {
    await this.delete(`/channels/${channelId}/pins/${messageId}`, headers);
  }

  async startThreadFromMessage(
    channelId: string,
    messageId: string,
    name: string
  ): Promise<RawChannel> {
    const res = await this.post(
      `/channels/${channelId}/messages/${messageId}`,
      { name }
    );

    return (await res.json()) as RawChannel;
  }

  async startThreadWithoutMessage(
    channelId: string,
    name: string
  ): Promise<RawChannel> {
    const res = await this.post(`/channels/${channelId}/threads`, {
      name,
      type: ChannelTypes.GUILD_PUBLIC_THREAD,
    });

    return (await res.json()) as RawChannel;
  }

  async joinThread(channelId: string) {
    await this.put(`/channels/${channelId}/thread-members/@me`);
  }

  async addThreadMember(channelId: string, userId: string) {
    await this.put(`/channels/${channelId}/thread-members/${userId}`);
  }

  async leaveThread(channelId: string) {
    await this.delete(`/channels/${channelId}/thread-members/@me`);
  }

  async removeThreadMember(channelId: string, userId: string) {
    await this.delete(`/channels/${channelId}/thread-members/${userId}`);
  }

  async listThreadMembers(channelId: string): Promise<RawThreadMember[]> {
    const res = await this.get(`/channels/${channelId}/thread-members`);

    return (await res.json()) as RawThreadMember[];
  }

  async listActiveThreads(
    guildId: string
  ): Promise<{ threads: RawChannel[]; members: RawThreadMember[] }> {
    const res = await this.get(`/guilds/${guildId}/threads/active`);

    return await res.json();
  }

  async getReactions(
    channelId: string,
    messageId: string,
    emoji: string
  ): Promise<RawUser[]> {
    const res = await this.get(
      `/channels/${channelId}/messages/${messageId}/reactions/${encodeURI(
        emoji
      )}`
    );

    return (await res.json()) as RawUser[];
  }

  async createReaction(channelId: string, messageId: string, emoji: string) {
    await this.put(
      `/channels/${channelId}/messages/${messageId}/reactions/${encodeURI(
        emoji
      )}/@me`
    );
  }

  async deleteReaction(
    channelId: string,
    messageId: string,
    emoji: string,
    userId?: boolean | string
  ): Promise<void> {
    if (userId)
      await this.delete(
        `/channels/${channelId}/messages/${messageId}/reactions/${emoji}/${userId}`
      );
    await this.delete(
      `/channels/${channelId}/messages/${messageId}/reactions/${emoji}/@me`
    );
  }

  // interaction stuff here

  async setInteraction(
    command: Omit<RawInteractionCommand, 'application_id' | 'version' | 'id'>
  ): Promise<RawInteractionCommand | void> {
    if (!this.client.user) return;
    const res = command.guild_id
      ? /* eslint-disable indent */
        await this.post(
          `/applications/${this.client.user.id}/guilds/${command.guild_id}/commands`,
          command
        )
      : await this.post(
          `/applications/${this.client.user.id}/commands`,
          command
        );

    return (await res.json()) as RawInteractionCommand;
  }

  async deleteInteraction(commandId: string, guildId?: string) {
    if (!this.client.user) return;
    if (guildId)
      await this.delete(
        `/applications/${this.client.user.id}/guilds/${guildId}/commands/${commandId}`
      );
    await this.delete(
      `/applications/${this.client.user.id}/commands/${commandId}`
    );
  }

  async getInteraction(
    commandId: string,
    guildId?: string
  ): Promise<RawInteractionCommand | void> {
    if (!this.client.user) return;
    const res = guildId
      ? await this.get(
          `/applications/${this.client.user.id}/guilds/${guildId}/commands/${commandId}`
        )
      : await this.get(
          `/applications/${this.client.user.id}/commands/${commandId}`
        );

    return (await res.json()) as RawInteractionCommand;
  }

  async getInteractionAll(
    guildId?: string
  ): Promise<RawInteractionCommand[] | void> {
    if (!this.client.user) return;
    const res = guildId
      ? await this.get(
          `/applications/${this.client.user.id}/guilds/${guildId}/commands`
        )
      : await this.get(`/applications/${this.client.user.id}/commands`);
    /* eslint-enable indent */
    return (await res.json()) as RawInteractionCommand[];
  }

  async createInteractionResponse(
    id: string,
    token: string,
    response: RawInteractionCallback
  ) {
    await this.post(`/interactions/${id}/${token}/callback`, { ...response });
  }

  async createFollowupMessage(
    id: string,
    token: string,
    message: RawMessageOptions
  ) {
    await this.post(`/webhooks/${id}/${token}`, { ...message });
  }

  async getOriginalInteractionResponse(
    id: string,
    token: string
  ): Promise<RawMessage> {
    const res = await this.get(`/webhooks/${id}/${token}/messages/@original`);

    return (await res.json()) as RawMessage;
  }

  async editOriginalInteractionResponse(
    id: string,
    token: string,
    message: RawMessageOptions
  ): Promise<RawMessage> {
    const res = await this.patch(
      `/webhooks/${id}/${token}/messages/@original`,
      { ...message }
    );

    return (await res.json()) as RawMessage;
  }
}

export interface RawMessageOptions {
  content?: string;
  tts?: boolean;
  embeds?: RawEmbed[];
  allowed_mentions?: RawAllowedMentions;
  message_reference?: RawMessageReference;
  components?: RawMessageComponent[];
  sticker_ids?: string[];
  flags?: MessageFlags;
}
