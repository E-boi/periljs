import fetch, { HeadersInit, Response } from "node-fetch";
import {
  RawApplicationCommand,
  RawApplicationCommandCreate,
  RawChannel,
  RawGatewayBot,
  RawInteractionCallback,
  RawInvite,
  RawInviteCreate,
  RawInviteMetadata,
  RawMessage,
  RawMessageCreate,
  RawModifyChannelJSON,
  RawOverwrite,
  RawThreadCreateFromMessage,
  RawThreadCreateWithoutMessage,
  RawUser,
} from "./rawTypes";
import Logger from "./logger";
import Message from "./message";

const API_URL = "https://discord.com/api/v10/";

export class Rest {
  private headers: HeadersInit;
  private logger: Logger = new Logger("Rest");

  constructor(token: string) {
    this.headers = {
      "User-Agent": "PerilJS (https://discord.gg/aCwa6nFj4z, v2)",
      "Content-Type": "application/json",
      Authorization: `Bot ${token}`,
    };
  }

  private async error(res: Response) {
    const err = (await res.json()) as any;

    this.logger.error(err);

    throw new Error(err.message?.toString());
  }

  async get(path: string, headers?: HeadersInit) {
    const res = await fetch(`${API_URL}${path}`, {
      headers: { ...this.headers, ...headers },
    });

    if (!res.ok) return this.error(res);

    if (res.headers.get("content-type")?.indexOf("application/json") !== -1) {
      return res.json() as Promise<any>;
    }

    return null;
  }

  async post(path: string, body: object, headers?: HeadersInit) {
    const res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { ...this.headers, ...headers },
    });

    if (!res.ok) return this.error(res);

    if (res.headers.get("content-type")?.indexOf("application/json") !== -1) {
      return res.json() as Promise<any>;
    }

    return null;
  }

  async put(path: string, body: object, headers?: HeadersInit) {
    const res = await fetch(`${API_URL}${path}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: { ...this.headers, ...headers },
    });

    if (!res.ok) return this.error(res);

    if (res.headers.get("content-type")?.indexOf("application/json") !== -1) {
      return res.json() as Promise<any>;
    }

    return null;
  }

  async patch(path: string, body: object, headers?: HeadersInit) {
    const res = await fetch(`${API_URL}${path}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: { ...this.headers, ...headers },
    });

    if (!res.ok) return this.error(res);

    if (res.headers.get("content-type")?.indexOf("application/json") !== -1) {
      return res.json() as Promise<any>;
    }

    return null;
  }

  async delete(path: string, headers?: HeadersInit) {
    const res = await fetch(`${API_URL}${path}`, {
      method: "DELETE",
      headers: { ...this.headers, ...headers },
    });

    if (!res.ok) return this.error(res);

    if (res.headers.get("content-type")?.indexOf("application/json") !== -1) {
      return res.json() as Promise<any>;
    }

    return null;
  }

  getGateway(): Promise<RawGatewayBot> {
    return this.get("gateway/bot");
  }

  createGlobalApplicationCommand(
    appId: string,
    command: RawApplicationCommandCreate
  ): Promise<RawApplicationCommand> {
    return this.post(`applications/${appId}/commands`, command);
  }

  createGuildApplicationCommand(
    appId: string,
    guildId: string,
    command: RawApplicationCommandCreate
  ): Promise<RawApplicationCommand> {
    return this.post(`applications/${appId}/guilds/${guildId}/commands`, command);
  }

  deleteGlobalApplicationCommmand(appId: string, commandId: string) {
    return this.delete(`applications/${appId}/commands/${commandId}`);
  }

  deleteGuildApplicationCommmand(appId: string, guildId: string, commandId: string) {
    return this.delete(`applications/${appId}/guilds/${guildId}/commands/${commandId}`);
  }

  createInteractionResponse(id: string, token: string, callback: RawInteractionCallback) {
    return this.post(`interactions/${id}/${token}/callback`, callback);
  }

  getOriginalInteractionResponse(appId: string, token: string): Promise<RawMessage> {
    return this.get(`webhooks/$${appId}}/${token}/messages/@original`);
  }

  editOriginalInteractionResponse(
    appId: string,
    token: string,
    message: Omit<RawMessageCreate, "sticker_ids" | "message_reference">
  ): Promise<RawMessage> {
    return this.patch(`webhooks/${appId}/${token}/messages/@original`, message);
  }

  deleteOriginalInteractionResponse(appId: string, token: string) {
    return this.delete(`webhooks/${appId}/${token}/messages/@original`);
  }

  createFollowupMessage(appId: string, token: string, message: RawMessageCreate) {
    return this.post(`webhooks/${appId}/${token}`, message);
  }

  getFollowupMessage(appId: string, token: string, messageId: string): Promise<RawMessage> {
    return this.get(`webhooks/${appId}/${token}/messages/${messageId}`);
  }

  editFollowupMessage(
    appId: string,
    token: string,
    messageId: string,
    message: RawMessageCreate
  ): Promise<RawMessage> {
    return this.patch(`webhooks/${appId}/${token}/messages/${messageId}`, message);
  }

  deleteFollowupMessage(appId: string, token: string, messageId: string) {
    return this.delete(`webhooks/${appId}/${token}/messages/${messageId}`);
  }

  modifyChannel(
    channelId: string,
    body: RawModifyChannelJSON,
    reason?: string
  ): Promise<RawChannel> {
    return this.patch(
      `channels/${channelId}`,
      body,
      reason ? { "X-Audit-Log-Reason": reason } : undefined
    );
  }

  deleteChannel(channelId: string, reason?: string) {
    this.delete(`channels/${channelId}`, reason ? { "X-Audit-Log-Reason": reason } : undefined);
  }

  getMessages(channelId: string): Promise<RawMessage[]> {
    return this.get(`channels/${channelId}/messages`);
  }

  getMessage(channelId: string, messageId: string): Promise<RawMessage> {
    return this.get(`channels/${channelId}/messages/${messageId}`);
  }

  createMessage(channelId: string, body: RawMessageCreate): Promise<RawMessage> {
    return this.post(`channels/${channelId}/messages`, body);
  }

  crosspostMessage(channelId: string, messageId: string): Promise<Message> {
    return this.post(`/channels/${channelId}/messages/${messageId}/crosspost`, {});
  }

  createReaction(channelId: string, messageId: string, emoji: string): Promise<void> {
    return this.put(`channels/${channelId}/messages/${messageId}/reactions/${emoji}/@me`, {});
  }

  deleteOwnReaction(channelId: string, messageId: string, emoji: string): Promise<void> {
    return this.delete(`channels/${channelId}/messages/${messageId}/reactions/${emoji}/@me`);
  }

  deleteUserReaction(
    channelId: string,
    messageId: string,
    emoji: string,
    userId: string
  ): Promise<void> {
    return this.delete(`channels/${channelId}/messages/${messageId}/reactions/${emoji}/${userId}`);
  }

  getReaction(channelId: string, messageId: string, emoji: string): Promise<RawUser[]> {
    return this.get(`channels/${channelId}/messages/${messageId}/reactions/${emoji}`);
  }

  deleteAllReaction(channelId: string, messageId: string) {
    return this.delete(`channels/${channelId}/messages/${messageId}/reactions`);
  }

  deleteAllReactionForEmoji(channelId: string, messageId: string, emoji: string): Promise<void> {
    return this.delete(`channels/${channelId}/messages/${messageId}/reactions/${emoji}`);
  }

  editMessage(
    channelId: string,
    messageId: string,
    message: Omit<RawMessageCreate, "sticker_ids" | "message_reference">
  ): Promise<RawMessage> {
    return this.patch(`channels/${channelId}/messages/${messageId}`, message);
  }

  deleteMessage(channelId: string, messageId: string, reason?: string): Promise<void> {
    return this.delete(
      `channels/${channelId}/messages/${messageId}`,
      reason ? { "X-Audit-Log-Reason": reason } : undefined
    );
  }

  bulkDeleteMessages(channelId: string, messageIds: string[], reason?: string): Promise<void> {
    return this.post(
      `channels/${channelId}/messages/bulk-delete`,
      messageIds,
      reason ? { "X-Audit-Log-Reason": reason } : undefined
    );
  }

  editChannelPermissions(
    channelId: string,
    overwriteId: string,
    overwrite: Omit<RawOverwrite, "id">
  ): Promise<void> {
    return this.put(`channels/${channelId}/permissions/${overwriteId}`, overwrite);
  }

  getChannelInvites(channelId: string): Promise<RawInviteMetadata[]> {
    return this.get(`channels/${channelId}/invites`);
  }

  createChannelInvite(
    channelId: string,
    invite: RawInviteCreate,
    reason?: string
  ): Promise<RawInvite> {
    return this.post(
      `channels/${channelId}/invites`,
      invite,
      reason ? { "X-Audit-Log-Reason": reason } : undefined
    );
  }

  deleteChannelPermission(channelId: string, overwriteId: string, reason?: string): Promise<void> {
    return this.delete(
      `channels/${channelId}/permission/${overwriteId}`,
      reason ? { "X-Audit-Log-Reason": reason } : undefined
    );
  }

  followAnnouncementChannel(channelId: string, body: { webhook_channel_id: string }) {
    return this.post(`channels/${channelId}/followers`, body);
  }

  triggerTypingIndicator(channelId: string): Promise<void> {
    return this.post(`channels/${channelId}/typing`, {});
  }

  createThreadFromMessage(
    channelId: string,
    messageId: string,
    body: RawThreadCreateFromMessage,
    reason?: string
  ): Promise<RawChannel> {
    return this.post(
      `channels/${channelId}/messages/${messageId}/threads`,
      body,
      reason ? { "X-Audit-Log-Reason": reason } : undefined
    );
  }

  createThreadWithoutMessage(
    channelId: string,
    body: RawThreadCreateWithoutMessage,
    reason?: string
  ): Promise<RawChannel> {
    return this.post(
      `channels/${channelId}/threads`,
      body,
      reason ? { "X-Audit-Log-Reason": reason } : undefined
    );
  }
}
