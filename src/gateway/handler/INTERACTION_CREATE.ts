import Gateway from '..';
import {
  ButtonInteraction,
  MessageInteraction,
  ModalInteraction,
  SelectMenuInteraction,
  SlashInteraction,
  UserInteraction,
} from '../../Interaction';
import {
  Commandtype,
  ComponentTypes,
  InteractionType,
  RawInteraction,
} from '../../RawTypes';

export default (data: RawInteraction, ws: Gateway) => {
  switch (data.type) {
    case InteractionType.APPLICATION_COMMAND:
      switch (data.data?.type) {
        case Commandtype.CHAT_INPUT:
          ws.client.emit(
            'interaction.slash',
            new SlashInteraction(data, ws.request)
          );
          break;

        case Commandtype.USER:
          ws.client.emit(
            'interaction.user',
            new UserInteraction(data, ws.request)
          );
          break;

        case Commandtype.MESSAGE:
          ws.client.emit(
            'interaction.message',
            new MessageInteraction(data, ws.request)
          );
      }
      break;

    case InteractionType.MESSAGE_COMPONENT:
      switch (data.data?.component_type) {
        case ComponentTypes.Button:
          ws.client.emit(
            'interaction.button',
            new ButtonInteraction(data, ws.request)
          );
          break;
        case ComponentTypes.SelectMenu:
          ws.client.emit(
            'interaction.selectmenu',
            new SelectMenuInteraction(data, ws.request)
          );
          break;
      }
      break;

    case InteractionType.MODAL_SUBMIT:
      ws.client.emit(
        'interaction.modal',
        new ModalInteraction(data, ws.request)
      );
      break;

    default:
      console.log(data);
  }
};
