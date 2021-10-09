import IChannel from '../../../../intf/IChannel';
import { createChannelClass } from '../../../util/channel';
import Peril from '../../peril';

export default function CHANNEL_DELETE({ bot }: Peril, data: IChannel) {
	const deletedChannel = createChannelClass(data, bot.HTTP);
	if (!deletedChannel) return;
	bot.channels.delete(deletedChannel.id.toString());
	bot.emit('channel.delete', deletedChannel);
}
