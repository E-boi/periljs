import WebSocket from 'ws';
import { EventEmitter } from 'events';
import Constants from '../../constants';
import { IClientOptions } from '../intf/IClientOptions';
import { IClient } from '../intf/IClient';
import { ISuccess } from '../intf/ISuccess';
import { ExpectMessageSuccess } from './success/ExpectMessageSuccess';

/**
 * Discord API Client
 * @date 8/7/2021 - 8:00:29 PM
 *
 * @class Client
 * @typedef {Client}
 * @extends {EventEmitter}
 * @implements {IClient}
 */
class Client extends EventEmitter implements IClient {
	private token: string;
	private applicationId: string;
	private initializedOptions: IClientOptions;
	private ws: WebSocket;
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
		this.applicationId = clientOptions.clientAuthentication.applicationId;
		this.initializedOptions = clientOptions;
		this.ws = new WebSocket(clientOptions.discordWebsocket || Constants.WS_URI);
	}
	/**
	 * Connects to Discord.
	 * @date 8/8/2021 - 11:21:23 AM
	 *
	 * @returns {Promise<ISuccess>}
	 */
	connect(): Promise<ISuccess> {
		throw new Error('Method not implemented.');
	}
	disconnect(): Promise<ISuccess> {
		throw new Error('Method not implemented.');
	}
	getGuildByID(guildID: string): Promise<any> {
		throw new Error('Method not implemented.');
	}
	getUserByID(userID: string): Promise<any> {
		throw new Error('Method not implemented.');
	}
	_buildPayload(opcode: any, payload: any): Promise<ISuccess> {
		throw new Error('Method not implemented.');
	}
	private isAsync(fn: Function): boolean {
		return (typeof fn).toLowerCase() !== 'function';
	}
	private registerExpectPayload(opcode: any): Promise<ISuccess> {
		return new Promise((resolve, reject) => {
			this.ws.on('message', (message: any) => {
				if (message.opcode === opcode) {
					resolve(new ExpectMessageSuccess(message));
				}
			});
		});
	}
}
