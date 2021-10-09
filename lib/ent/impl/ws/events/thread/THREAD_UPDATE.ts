import { IThreadChannel } from '../../../../intf/IChannel';
import { createChannelClass } from '../../../util/channel';
import Peril from '../../peril';

export default function THREAD_UPDATE({ bot }: Peril, data: IThreadChannel) {
	const threadUpdated = createChannelClass(data as any, bot.HTTP);
	const beforeThreadUpdated = bot.channels.get(data.id);
	if (!threadUpdated) return;
	bot.channels.set(threadUpdated.id.toString(), threadUpdated);
	bot.emit('thread.update', beforeThreadUpdated, threadUpdated);
}
