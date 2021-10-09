import Peril from '../../peril';
import User from '../../../User';
import { IUser } from '../../../../intf/user/IUser';

export default function GUILD_BAN_ADD({ bot }: Peril, data: { guild_id: string; user: IUser }) {
	const bannedFrom = bot.guilds.get(data.guild_id);
	const bannedMember = new User(data.user);
	bot.emit('guild.ban.add', bannedMember, bannedFrom);
}
