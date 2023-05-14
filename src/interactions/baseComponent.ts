import { Client } from "../client";
import Message, { MessageOptions } from "../message";
import { RawInteraction, RawInteractionMessageComponentData } from "../rawTypes";
import { ComponentTypes, InteractionCallbackTypes, InteractionTypes } from "../enums";
import { ModalReplyableInteraction } from "./replyable";

export interface ComponentFields {
  customId: string;
  componentType: ComponentTypes;
}

export default class BaseComponentInteraction extends ModalReplyableInteraction {
  component: ComponentFields;
  message: Message;

  constructor(interaction: RawInteraction, client: Client) {
    super(interaction, client);
    this.component = {
      componentType: (interaction.data as RawInteractionMessageComponentData).component_type,
      customId: (interaction.data as RawInteractionMessageComponentData).custom_id,
    };

    this.message = new Message(interaction.message!);
  }

  updateMessage(message: Omit<MessageOptions, "sticker_ids" | "message_reference">) {
    if (this.type !== InteractionTypes.MESSAGE_COMPONENT)
      throw new Error("Only Message Component Interactions can update message");

    return this.client.rest.createInteractionResponse(this.id, this.token, {
      type: InteractionCallbackTypes.UPDATE_MESSAGE,
      data: Message.create(message),
    });
  }
}
