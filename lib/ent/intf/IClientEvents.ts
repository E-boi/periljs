import { IUser } from './user/IUser';
import IMessage from './IMessage';
import IGuild from './guild/IGuild';

export default interface IClientEvents<T> {
	(event: 'ready', listener: (user: IUser) => void): T;
	(event: 'guild.create', listener: (guild: IGuild) => void): T;
	(event: 'guild.delete', listener: (guild: IGuild) => void): T;
	(event: 'message.create', listener: (message: IMessage) => void): T;
	(event: 'message.update', listener: (message: IMessage) => void): T;
	(event: 'message.delete', listener: (message: IMessage) => void): T;
}
