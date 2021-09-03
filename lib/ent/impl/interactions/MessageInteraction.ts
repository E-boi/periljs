import IInteraction, { IMessageCommand } from '../../intf/IInteraction';
import Client from '../client';
import interaction from './Interaction';

export default class MessageInteraction extends interaction {
	command: IMessageCommand;
	constructor(bot: Client, interaction: IInteraction) {
		super(bot, interaction);
		this.command = interaction.data as any;
	}
}
