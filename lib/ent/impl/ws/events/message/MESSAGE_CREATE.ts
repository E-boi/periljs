import IMessage from '../../../../intf/IMessage';
import Message from '../../../Message';
import Peril from '../../peril';
import { createChannelClass } from '../../../util/channel';

export default function MESSAGE_CREATE({ bot }: Peril, data: IMessage) {
	if (!bot.channels.has(data.channel_id)) {
		bot.HTTP.getChannel(data.channel_id).then(c => {
			if (!c) return;
			const channel = createChannelClass(c, bot.HTTP);
			if (!channel) return;
			bot.channels.set(channel.id.toString(), channel);
			if (data.author.id === bot.bot?.id) return;
			const message: Message = new Message(data, bot);
			bot.emit('message.create', message);
		});
	} else {
		if (data.author.id === bot.bot?.id) return;
		const message: Message = new Message(data, bot);
		bot.emit('message.create', message);
	}
}
