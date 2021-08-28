import { Opcode } from '../const/discord/opcodes';
import { ISuccess } from './ISuccess';
import { IClientOptions } from './IClientOptions';

export interface IClient {
	connect(): Promise<ISuccess>;
	disconnect(): Promise<ISuccess>;
	getGuildByID(guildID: string): Promise<IGuild>;
	getUserByID(userID: string): Promise<IUser>;
	_buildPayload(opcode: Opcode, payload: any): Promise<ISuccess>;
}
