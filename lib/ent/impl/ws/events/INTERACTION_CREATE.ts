import IInteraction from '../../../intf/IInteraction';
import { ButtonInteraction, MessageInteraction, SelectMenuInteraction, SlashInteraction, UserInteraction } from '../../interactions';
import Peril from '../peril';

export default function INTERACTION_CREATE({ bot }: Peril, data: IInteraction) {
	if (data.type === 2) {
		if (data.data?.type === 1) bot.emit('interaction.slash', new SlashInteraction(bot, data));
		else if (data.data?.type === 2) bot.emit('interaction.user', new UserInteraction(bot, data));
		else if (data.data?.type === 3) bot.emit('interaction.message', new MessageInteraction(bot, data));
	} else if (data.type === 3) {
		if (data.data?.component_type === 2) bot.emit('interaction.button', new ButtonInteraction(bot, data));
		if (data.data?.component_type === 3) bot.emit('interaction.selectMenu', new SelectMenuInteraction(bot, data));
	}
}
