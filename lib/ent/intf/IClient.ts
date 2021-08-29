import { Opcode } from '../const/discord/opcodes';
import { ISuccess } from './ISuccess';
// import { IClientOptions } from './IClientOptions';
import { IUser } from './user/IUser';
import IGuild from './guild/IGuild';

export interface IClient {
	connect(): void;
	disconnect(): Promise<ISuccess>;
	getGuildByID(guildID: string): IGuild | undefined;
	getUserByID(userID: string): Promise<IUser>;
	_buildPayload(opcode: Opcode, payload: any): Promise<ISuccess>;
}
