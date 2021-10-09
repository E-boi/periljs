import IInvite from '../../../intf/IInvite';
import Invite from '../../Invite';
import Peril from '../peril';

export default function INVITE_CREATE({ bot }: Peril, data: IInvite) {
	const createdInvite = new Invite(data, bot);
	bot.emit('invite.create', createdInvite);
}
