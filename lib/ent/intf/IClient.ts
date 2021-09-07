import { IUser } from './user/IUser';
import { ISuccess } from './ISuccess';
import { Guild } from '../../..';

export interface IClient {
	connect(): void;
	disconnect(): Promise<ISuccess>;
	getGuildByID(guildID: string): Guild | undefined;
	getUserByID(userID: string): Promise<IUser | null>;
	// _buildPayload(opcode: Opcode, payload: any): Promise<ISuccess>;
}
