import { IUser } from './user/IUser';
import IMessage from './IMessage';
// import IGuild from './guild/IGuild';
import SlashInteraction from '../impl/interactions/SlashInteraction';
import UserInteraction from '../impl/interactions/UserInteraction';
import MessageInteraction from '../impl/interactions/MessageInteraction';
import ButtonInteraction from '../impl/interactions/ButtonInteraction';
import SelectMenuInteraction from '../impl/interactions/SelectMenuInteraction';
import { Guild } from '../..';
import Message from '../impl/Message';

export default interface IClientEvents<T> {
	(event: 'ready', listener: (user: IUser) => void): T;
	(event: 'guild.create', listener: (guild: Guild) => void): T;
	(event: 'guild.delete', listener: (guild: Guild) => void): T;
	(event: 'message.create', listener: (message: Message) => void): T;
	(event: 'message.update', listener: (message: Message) => void): T;
	(event: 'message.delete', listener: (message: IMessage) => void): T;
	(event: 'interaction.slash', listener: (interaction: SlashInteraction) => void): T;
	(event: 'interaction.user', listener: (interaction: UserInteraction) => void): T;
	(event: 'interaction.message', listener: (interaction: MessageInteraction) => void): T;
	(event: 'interaction.button', listener: (interaction: ButtonInteraction) => void): T;
	(event: 'interaction.selectMenu', listener: (interaction: SelectMenuInteraction) => void): T;
}
