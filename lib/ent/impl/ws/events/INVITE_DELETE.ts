import IInvite from '../../../intf/IInvite';
import { DeletedInvite } from '../../Invite';
import Peril from '../peril';

export default function INVITE_DELETE({ bot }: Peril, data: IInvite) {
	const deletedInvite = new DeletedInvite(data, bot);
	bot.emit('invite.delete', deletedInvite);
}
