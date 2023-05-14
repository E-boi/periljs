import Message, { MessageOptions } from "../message";
import { GuildChannel } from "./guild";

export class BaseGuildTextableChannel extends GuildChannel {
  async send(message: MessageOptions) {
    return new Message(
      await this.client.rest.createMessage(this.id, {
        allowed_mentions: message.allowedMentions,
        attachments: message.attachments?.map((a) => a.toJson()),
        components: message.components?.map((c) => c.toJson()),
        content: message.content,
        embeds: message.embeds?.map((e) => e.toJson()),
        flags: message.flags?.reduce((a, b) => a + b),
        message_reference: message.messageReference?.toJson(),
        sticker_ids: message.stickerIds,
        tts: message.tts,
      })
    );
  }

  bulkDeleteMessages(messgaeIds: string[]) {
    return this.client.rest.bulkDeleteMessages(this.id, messgaeIds);
  }

  triggerTyping() {
    return this.client.rest.triggerTypingIndicator(this.id);
  }

  fetchPinnedMessages() {
    throw new Error("Method not implemented.");
  }
}
