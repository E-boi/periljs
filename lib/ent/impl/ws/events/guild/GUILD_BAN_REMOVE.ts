import Peril from '../../peril';
import User from '../../../User';
import { IUser } from '../../../../intf/user/IUser';

export default function GUILD_BAN_REMOVE({ bot }: Peril, data: { guild_id: string; user: IUser }) {
	const unbannedFrom = bot.guilds.get(data.guild_id);
	const unbannedMember = new User(data.user);
	bot.emit('guild.ban.remove', unbannedMember, unbannedFrom);
}
