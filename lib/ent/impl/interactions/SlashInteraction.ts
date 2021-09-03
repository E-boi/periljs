import IInteraction, { ISlashCommand } from '../../intf/IInteraction';
import Client from '../client';
import interaction from './Interaction';

export default class SlashInteraction extends interaction {
	command: ISlashCommand;
	constructor(bot: Client, interaction: IInteraction) {
		super(bot, interaction);
		this.command = interaction.data as any;
	}
}
