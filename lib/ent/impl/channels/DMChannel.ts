import { IDMChannel } from '../../intf/IChannel';
import { IUser } from '../../intf/user/IUser';
import HTTP from '../HTTP';
import BaseTextChannel from './BaseTextChannel';

export default class DMChannel extends BaseTextChannel {
	type: 'DM' = 'DM';
	recipients: IUser[];
	constructor(channel: IDMChannel, http: HTTP) {
		super(channel as any, http);
		this.recipients = channel.recipients;
	}
}
