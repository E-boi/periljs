import { IThreadChannel } from '../../../../intf/IChannel';
import Peril from '../../peril';

export default function THREAD_DELETE({ bot }: Peril, data: IThreadChannel) {
	const threadDeleted = bot.channels.get(data.id);
	bot.emit('thread.delete', threadDeleted);
	bot.channels.delete(data.id);
}
