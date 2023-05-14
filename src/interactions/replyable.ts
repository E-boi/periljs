import { ActionRow } from "../components";
import Message, { MessageOptions } from "../message";
import { InteractionCallbackTypes, InteractionTypes, MessageFlags } from "../enums";
import BaseInteraction from "./base";

export class ReplyableInteraction extends BaseInteraction {
  followup?: Message;

  reply(message: Omit<MessageOptions, "sticker_ids" | "message_reference">) {
    return this.client.rest.createInteractionResponse(this.id, this.token, {
      type: InteractionCallbackTypes.CHANNEL_MESSAGE_WITH_SOURCE,
      data: Message.create(message),
    });
  }

  async editReply(message: Omit<MessageOptions, "sticker_ids" | "message_reference">) {
    return new Message(
      await this.client.rest.editOriginalInteractionResponse(
        this.applicationId,
        this.token,
        Message.create(message)
      )
    );
  }

  deleteReply() {
    return this.client.rest.deleteOriginalInteractionResponse(this.id, this.token);
  }

  deferReply(ephemeral: boolean) {
    return this.client.rest.createInteractionResponse(this.id, this.token, {
      type: InteractionCallbackTypes.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        flags: ephemeral ? MessageFlags.EPHEMERAL : undefined,
      },
    });
  }

  deferUpdate() {
    if (this.type !== InteractionTypes.MESSAGE_COMPONENT)
      throw new Error("Only Message Component Interactions can defer update");

    return this.client.rest.createInteractionResponse(this.id, this.token, {
      type: InteractionCallbackTypes.DEFERRED_UPDATE_MESSAGE,
    });
  }

  async createFollowup(message: MessageOptions) {
    const msg = new Message(
      await this.client.rest.createFollowupMessage(
        this.applicationId,
        this.token,
        Message.create(message)
      )
    );

    this.followup = msg;

    return msg;
  }

  async editFollowup(message: MessageOptions) {
    if (!this.followup)
      throw new Error("Can't edit follow up message, first create one by using .createFollowup");

    const msg = new Message(
      await this.client.rest.editFollowupMessage(
        this.applicationId,
        this.token,
        this.followup.id,
        Message.create(message)
      )
    );

    this.followup = msg;

    return msg;
  }

  async deleteFollowup() {
    if (!this.followup)
      throw new Error("Can't delete follow up message, first create one by using .createFollowup");

    await this.client.rest.deleteFollowupMessage(this.applicationId, this.token, this.followup.id);
    delete this.followup;
  }
}

interface ModalReply {
  customId: string;
  title: string;
  components: ActionRow[];
}

export class ModalReplyableInteraction extends ReplyableInteraction {
  modalReply(reply: ModalReply) {
    return this.client.rest.createInteractionResponse(this.id, this.token, {
      type: InteractionCallbackTypes.MODAL,
      data: {
        custom_id: reply.customId,
        title: reply.title,
        components: reply.components.map((c) => c.toJson()),
      },
    });
  }
}
