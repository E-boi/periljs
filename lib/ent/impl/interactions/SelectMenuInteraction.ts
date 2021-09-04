import { ISelectMenuComponentData } from '../../intf/IComponent';
import IInteraction from '../../intf/IInteraction';
import Client from '../client';
import interaction from './Interaction';

export default class SelectMenuInteraction extends interaction {
	menu: ISelectMenuComponentData;
	constructor(bot: Client, interaction: IInteraction) {
		super(bot, interaction);
		delete interaction.data!.component_type;
		const selectMenu = interaction
			.message!.components!.find(c => c.components.find(com => com.custom_id === interaction.data!.custom_id))
			?.components.filter(com => com.custom_id === interaction.data!.custom_id)[0] as any; // this is pain
		this.menu = selectMenu;
		this.menu.values = interaction.data!.values as ISelectMenuComponentData['values'];
	}
}
