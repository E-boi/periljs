import IChannel from '../../intf/IChannel';
import Category from '../channels/Category';
import DMChannel from '../channels/DMChannel';
import TextChannel from '../channels/TextChannel';
import ThreadChannel from '../channels/ThreadChannel';
import VoiceChannel from '../channels/VoiceChannel';
import HTTP from '../HTTP';

export function createChannelClass(channel: IChannel, http: HTTP) {
	if (channel.type === 0) return new TextChannel(channel as any, http);
	else if (channel.type === 1) return new DMChannel(channel as any, http);
	else if (channel.type === 2) return new VoiceChannel(channel as any);
	else if (channel.type === 4) return new Category(channel as any);
	else if (channel.type === 11 || channel.type === 12) return new ThreadChannel(channel as any, http);
	else return;
}
