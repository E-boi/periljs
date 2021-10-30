import { EventEmitter } from 'events';
import { IClientOptions } from '../intf/IClientOptions';
import { IClient } from '../intf/IClient';
import Peril from './ws/peril';
import { IUser } from '../intf/user/IUser';
import HTTP from './HTTP';
import IMessage, { IMessageCreate } from '../intf/IMessage';
import IClientEvents from '../intf/IClientEvents';
import { Snowflake } from '../const/Snowflake';
import { ISuccess } from '../intf/ISuccess';
import { transformComponents } from './util/components';
import Guild from './guild/Guild';
import { TextChannel, Category, DMChannel, ThreadChannel, VoiceChannel } from './channels';
import { IActivityCreate } from '../intf/IActivity';
import User, { ClientUser } from './User';
import CommandsClass from './Commands';
import IEmbed from '../intf/IEmbed';

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
	commands: CommandsClass;
	HTTP: HTTP;
	declare on: IClientEvents<this>;
	declare once: IClientEvents<this>;
	bot?: ClientUser;
	guilds: Map<string, Guild>;
	channels: Map<string, TextChannel | DMChannel | VoiceChannel | ThreadChannel | Category>;
	getAllMembers: boolean;
	/**
	 * Creates an instance of Client.
	 * @date 8/8/2021 - 11:21:12 AM
	 *
	 * @constructor
	 * @param {IClientOptions} clientOptions
	 */
	constructor(clientOptions: IClientOptions) {
		super();
		this.token = clientOptions.token;
		this.initializedOptions = clientOptions;
		this.guilds = new Map();
		this.channels = new Map();
		this.HTTP = new HTTP(this.token, this);
		this.getAllMembers = clientOptions.getAllMembers || false;
		this.commands = new CommandsClass(this);
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

	getGuildByID(guildID: string | Snowflake) {
		return this.guilds.get(guildID.toString());
	}

	getChannelByID(channelId: string | Snowflake) {
		return this.channels.get(channelId.toString());
	}

	/**
	 * Get a user through discord api by id
	 * @param {string} userID - user id
	 * @returns {Promise<IUser | null>}
	 */

	async getUserByID(userID: string): Promise<User | null> {
		const userReq = await this.HTTP.get(`/users/${userID}`);
		if (!userReq.ok) return null;
		return new User((await userReq.json()) as IUser);
	}

	/**
	 * Send a message
	 * @param {IMessageCreate} message - A message object to send
	 * @param {string} channel_id - A channel id
	 * @returns {Promise<Response>}
	 */
	async sendMessage(message: IMessageCreate, channel_id: string): Promise<IMessage> {
		if (message.components) message.components = transformComponents(message.components);
		return this.HTTP.sendMessage(message, channel_id);
	}
	async sendEmbed(embed: IEmbed, channel_id: string) {
		return this.HTTP.sendEmbed(embed, channel_id);
	}

	setActivity(activity: IActivityCreate) {
		if (!this.ws) return;
		this.ws.send(JSON.stringify({ op: 3, d: { since: 0, activities: [activity], status: 'online', afk: false } }));
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
