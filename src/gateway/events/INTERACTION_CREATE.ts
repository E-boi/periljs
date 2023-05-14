import { Gateway } from "..";
import ButtonInteraction from "../../interactions/button";
import { MessageInteraction } from "../../interactions/message";
import ModalInteraction from "../../interactions/modal";
import SelectMenuInteraction from "../../interactions/selectMenu";
import SlashInteraction from "../../interactions/slash";
import { UserInteraction } from "../../interactions/user";
import {
  RawInteraction,
  RawInteractionApplicationCommandData,
  RawInteractionMessageComponentData,
} from "../../rawTypes";
import { CommandTypes, ComponentTypes, InteractionTypes } from "../../enums";

export default function INTERACTION_CREATE(data: RawInteraction, gateway: Gateway) {
  switch (data.type) {
    case InteractionTypes.APPLICATION_COMMAND: {
      const d = data.data as RawInteractionApplicationCommandData;
      if (d.type === CommandTypes.CHAT_INPUT)
        gateway.client.emit("interaction.slash", new SlashInteraction(data, gateway.client));
      else if (d.type === CommandTypes.USER)
        gateway.client.emit("interaction.user", new UserInteraction(data, gateway.client));
      else if (d.type === CommandTypes.MESSAGE)
        gateway.client.emit("interaction.message", new MessageInteraction(data, gateway.client));

      break;
    }
    case InteractionTypes.APPLICATION_COMMAND_AUTOCOMPLETE: {
      gateway.logger.debug(data);
      break;
    }
    case InteractionTypes.MESSAGE_COMPONENT: {
      const d = data.data as RawInteractionMessageComponentData;
      if (d.component_type === ComponentTypes.Button)
        gateway.client.emit("interaction.button", new ButtonInteraction(data, gateway.client));
      else if (
        [
          ComponentTypes.MentionableSelect,
          ComponentTypes.RoleSelect,
          ComponentTypes.UserSelect,
          ComponentTypes.StringSelect,
          ComponentTypes.ChannelSelect,
        ].includes(d.component_type)
      )
        gateway.client.emit(
          "interaction.selectmenu",
          new SelectMenuInteraction(data, gateway.client)
        );

      break;
    }
    case InteractionTypes.MODAL_SUBMIT: {
      gateway.client.emit("interaction.modal", new ModalInteraction(data, gateway.client));
      break;
    }
  }
}
