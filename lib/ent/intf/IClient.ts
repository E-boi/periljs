import { IUser } from './user/IUser';
import IGuild from './guild/IGuild';
import { ISuccess } from './ISuccess';

export interface IClient {
	connect(): void;
	disconnect(): Promise<ISuccess>;
	getGuildByID(guildID: string): IGuild | undefined;
	getUserByID(userID: string): Promise<IUser | null>;
	// _buildPayload(opcode: Opcode, payload: any): Promise<ISuccess>;
}
