import IGuildMember from '../../../../intf/guild/IGuildMember';
import { GuildMember } from '../../../guild/GuildMember';
import Peril from '../../peril';

export default function GUILD_MEMBER_UPDATE({ bot }: Peril, data: { guild_id: string } & IGuildMember) {
	const updatedFrom = bot.guilds.get(data.guild_id);
	const memberBefore = updatedFrom?.members.get(data.user.id);
	if (!updatedFrom) return;
	const memberNow = new GuildMember(data, updatedFrom);
	bot.emit('guild.member.update', memberBefore, memberNow, updatedFrom);
	updatedFrom?.members.set(memberNow.user.id, memberNow);
}
