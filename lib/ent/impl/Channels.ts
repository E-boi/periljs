import { ICreateCategory, ICreateTextChannel, ICreateVoiceChannel } from '../intf/ICreateChannel';
import HTTP from './HTTP';

export default class Channels<K, P> extends Map<K, P> {
	private guildId: string;
	private HTTP: HTTP;
	constructor(id: string, http: HTTP) {
		super();
		this.guildId = id;
		this.HTTP = http;
	}
	create(channel: ICreateTextChannel | ICreateVoiceChannel | ICreateCategory) {
		return this.HTTP.createGuildChannel(this.guildId.toString(), channel);
	}
}
