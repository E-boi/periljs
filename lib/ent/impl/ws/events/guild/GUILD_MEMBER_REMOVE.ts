import Peril from '../../peril';
import User from '../../../User';
import { IUser } from '../../../../intf/user/IUser';

export default function GUILD_MEMBER_REMOVE({ bot }: Peril, data: { guild_id: string; user: IUser }) {
	const leftedMember = new User(data.user);
	const guildLefted = bot.guilds.get(data.guild_id);
	guildLefted?.members.delete(leftedMember.id);
	bot.emit('guild.member.leave', leftedMember, guildLefted);
}
