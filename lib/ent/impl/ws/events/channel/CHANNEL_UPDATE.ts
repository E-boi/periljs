import IChannel from '../../../../intf/IChannel';
import { createChannelClass } from '../../../util/channel';
import Peril from '../../peril';

export default function CHANNEL_UPDATE({ bot }: Peril, data: IChannel) {
	const channel = bot.channels.get(data.id);
	const updatedChannel = createChannelClass(data, bot.HTTP);
	if (!updatedChannel) return;
	bot.channels.set(updatedChannel.id.toString(), updatedChannel);
	bot.emit('channel.update', channel, updatedChannel);
}
