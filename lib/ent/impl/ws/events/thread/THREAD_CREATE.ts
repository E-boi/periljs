import IChannel from '../../../../intf/IChannel';
import { createChannelClass } from '../../../util/channel';
import Peril from '../../peril';

export default function THREAD_CREATE({ bot }: Peril, data: IChannel) {
	const threadCreated = createChannelClass(data, bot.HTTP);
	if (!threadCreated) return;
	bot.channels.set(threadCreated.id.toString(), threadCreated);
	bot.emit('thread.create', threadCreated);
}
