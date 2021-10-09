import { ISuccess } from './ISuccess';
import { Guild } from '../../..';
import User from '../impl/User';

export interface IClient {
	connect(): void;
	disconnect(): Promise<ISuccess>;
	getGuildByID(guildID: string): Guild | undefined;
	getUserByID(userID: string): Promise<User | null>;
	// _buildPayload(opcode: Opcode, payload: any): Promise<ISuccess>;
}
