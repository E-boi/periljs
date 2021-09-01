import { API_URI } from '../../constants';
import IMessage, { IMessageCreate } from '../intf/IMessage';
import fetch, { BodyInit, HeadersInit, Response } from 'node-fetch';

export default class HTTP {
	private base_url: string;
	private token: string;
	private headers: HeadersInit;
	constructor(token: string) {
		this.base_url = API_URI;
		this.token = token;
		this.headers = {
			'User-Agent': 'periljs (https://discord.gg/aCwa6nFj4z, v1)',
			'Content-Type': 'application/json',
			Authorization: `Bot ${this.token}`,
		};
	}

	post(url: string, body: BodyInit) {
		return fetch(`${this.base_url}${url}`, { method: 'POST', body, headers: this.headers });
	}

	get(url: string): Promise<Response> {
		return fetch(`${this.base_url}${url}`, { method: 'GET', headers: this.headers });
	}

	async sendMessage(message: IMessageCreate, channel_id: string): Promise<IMessage> {
		const messageReq = await this.post(`/channels/${channel_id}/messages`, JSON.stringify(message));
		const messageObj: IMessage = await messageReq.json();
		return messageObj;
	}
}
