import { ButtonStyles } from '../../const/discord/message';
import { IButtonComponent } from '../../intf/IComponent';
import IInteraction from '../../intf/IInteraction';
import Client from '../client';
import interaction from './Interaction';

export default class ButtonInteraction extends interaction {
	button: IButtonComponent;
	constructor(bot: Client, interaction: IInteraction) {
		super(bot, interaction);
		delete interaction.data!.component_type;
		const button = interaction
			.message!.components!.find(c => c.components.find(com => com.custom_id === interaction.data!.custom_id))
			?.components.filter(com => com.custom_id === interaction.data!.custom_id)[0] as any; // this is pain
		button.style = ButtonStyles[button.style] as any;

		this.button = button;
	}
}
