import { Snowflake } from '../../const/Snowflake';
import { ITextChannel } from '../../intf/IChannel';
import IMessage, { IMessageCreate } from '../../intf/IMessage';
import HTTP from '../HTTP';
import { transformComponents } from '../util/components';

export default class BaseTextChannel {
	id: Snowflake;
	name: string;
	lastPinTimestamp?: Date;
	lastMessageId?: string;
	private HTTP: HTTP;
	constructor(channel: ITextChannel, http: HTTP) {
		this.id = new Snowflake(channel.id);
		this.name = channel.name;
		this.lastPinTimestamp = (channel.last_pin_timestamp && new Date(channel.last_pin_timestamp)) || undefined;
		this.lastMessageId = channel.last_message_id;

		this.HTTP = http;
	}

	async sendMessage(message: IMessageCreate | string): Promise<IMessage> {
		if (typeof message === 'string') message = { content: message };
		if (message.components) message.components = transformComponents(message.components);
		return this.HTTP.sendMessage(message, this.id.toString());
	}

	async fetchMessage(messageID: string | Snowflake) {
		return this.HTTP.getMessage(messageID.toString(), this.id.toString());
	}

	async fetchMessages(limit: number = 50) {
		return this.HTTP.getMessages(this.id.toString(), limit);
	}

	async deleteMessage(message_id: string, reason?: string) {
		return this.HTTP.deleteMessage(message_id, this.id.toString(), { 'X-Audit-Log-Reason': reason });
	}
}
