import { IDMChannel } from '../../intf/IChannel';
import HTTP from '../HTTP';
import User from '../User';
import BaseTextChannel from './BaseTextChannel';

export default class DMChannel extends BaseTextChannel {
	type: 'DM' = 'DM';
	recipients: Map<string, User> = new Map();
	constructor(channel: IDMChannel, http: HTTP) {
		super(channel as any, http);
		channel.recipients.map(user => this.recipients.set(user.id, new User(user)));
	}
}
