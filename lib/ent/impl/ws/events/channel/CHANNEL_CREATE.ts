import IChannel from '../../../../intf/IChannel';
import { createChannelClass } from '../../../util/channel';
import Peril from '../../peril';

export default function CHANNEL_CREATE({ bot }: Peril, data: IChannel) {
	const createdChannel = createChannelClass(data, bot.HTTP);
	if (!createdChannel) return;
	bot.channels.set(createdChannel.id.toString(), createdChannel);
	bot.emit('channel.create', createdChannel);
}
