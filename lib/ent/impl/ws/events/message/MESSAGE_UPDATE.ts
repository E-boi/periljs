import IMessage from '../../../../intf/IMessage';
import Message from '../../../Message';
import Peril from '../../peril';

export default function MESSAGE_UPDATE({ bot }: Peril, data: IMessage) {
	const updatedMessage = new Message(data, bot);
	bot.emit('message.update', updatedMessage);
}
