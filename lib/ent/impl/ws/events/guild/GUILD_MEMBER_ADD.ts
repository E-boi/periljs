import IGuildMember from '../../../../intf/guild/IGuildMember';
import { GuildMember } from '../../../guild/GuildMember';
import Peril from '../../peril';

export default function GUILD_MEMBER_ADD({ bot }: Peril, data: { guild_id: string } & IGuildMember) {
	const guildJoined = bot.guilds.get(data.guild_id);
	if (!guildJoined) return;
	const addedMember = new GuildMember(data, guildJoined);
	guildJoined?.members.set(addedMember.user.id, addedMember);
	bot.emit('guild.member.join', addedMember, guildJoined);
}
