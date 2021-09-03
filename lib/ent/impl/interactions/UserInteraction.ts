import IInteraction, { IUserCommand } from '../../intf/IInteraction';
import Client from '../client';
import interaction from './Interaction';

export default class UserInteraction extends interaction {
	command: IUserCommand;
	constructor(bot: Client, interaction: IInteraction) {
		super(bot, interaction);
		this.command = interaction.data as any;
	}
}
