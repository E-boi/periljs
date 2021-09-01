import { EventEmitter } from 'events';
import { IClientOptions } from '../intf/IClientOptions';
import { IClient } from '../intf/IClient';
import Peril from './peril';
import { IUser } from '../intf/user/IUser';
import IGuild from '../intf/guild/IGuild';
import HTTP from './HTTP';
import IMessage, { IMessageCreate } from '../intf/IMessage';
import IClientEvents from '../intf/IClientEvents';
import { Snowflake } from '../const/Snowflake';
import { ISuccess } from '../intf/ISuccess';

/**
 * Discord API Client
 * @date 8/7/2021 - 8:00:29 PM
 *
 * @class Client
 * @typedef {Client}
 * @extends {EventEmitter}
 * @implements {IClient}
 */
export default class Client extends EventEmitter implements IClient {
	private token: string;
	private initializedOptions: IClientOptions;
	private ws?: Peril;
	private HTTP: HTTP;
	declare on: IClientEvents<this>;
	declare once: IClientEvents<this>;
	bot?: IUser;
	guilds: Map<Snowflake, IGuild>;
	/**
	 * Creates an instance of Client.
	 * @date 8/8/2021 - 11:21:12 AM
	 *
	 * @constructor
	 * @param {IClientOptions} clientOptions
	 */
	constructor(clientOptions: IClientOptions) {
		super();
		this.token = clientOptions.clientAuthentication.token;
		this.initializedOptions = clientOptions;
		this.bot = undefined;
		this.guilds = new Map();
		this.HTTP = new HTTP(this.token);
	}
	/**
	 * Connects to Discord.
	 * @date 8/8/2021 - 11:21:23 AM
	 */
	connect() {
		this.ws = new Peril(this.initializedOptions, this);
	}

	disconnect(): Promise<ISuccess> {
		throw new Error('Method not implemented.');
	}

	/**
	 * Get a cached guild by id
	 * @param {string} guildID - guild id
	 * @returns {IGuild | undefined}
	 */

	getGuildByID(guildID: string): IGuild | undefined {
		return this.guilds.get(new Snowflake(guildID));
	}

	/**
	 * Get a user through discord api by id
	 * @param {string} userID - user id
	 * @returns {Promise<IUser | null>}
	 */

	async getUserByID(userID: string): Promise<IUser | null> {
		const userReq = await this.HTTP.get(`/users/${userID}`);
		if (!userReq.ok) return null;
		return userReq.json();
	}

	/**
	 * Send a message
	 * @param {IMessageCreate} message - A message object to send
	 * @param {string} channel_id - A channel id
	 * @returns {Promise<Response>}
	 */
	async sendMessage(message: IMessageCreate, channel_id: string): Promise<IMessage> {
		return this.HTTP.sendMessage(message, channel_id);
	}
	// _buildPayload(opcode: any, payload: any): Promise<ISuccess> {
	// 	opcode;
	// 	payload;
	// 	throw new Error('Method not implemented.');
	// }

	// private isAsync(fn: Function): boolean {
	// 	return (typeof fn).toLowerCase() !== 'function';
	// }
	// private registerExpectPayload(opcode: any): Promise<ISuccess> {
	// 	return new Promise((resolve, reject) => {
	// 		this.ws.on('message', (message: any) => {
	// 			if (message.opcode === opcode) {
	// 				resolve(new ExpectMessageSuccess(message));
	// 			}
	// 		});
	// 	});
	// }
}
