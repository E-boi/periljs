import IInteraction, { IInteractionCommand } from '../intf/IInteraction';
import Client from './client';
import interaction from './Interaction';

export default class SlashInteraction extends interaction {
	command: IInteractionCommand;
	constructor(bot: Client, interaction: IInteraction) {
		super(bot, interaction);
		this.command = interaction.data as any;
	}
}
