import IGuildMember from '../../../../intf/guild/IGuildMember';
import { GuildMember } from '../../../guild/GuildMember';
import Peril from '../../peril';

export default function GUILD_MEMBERS_CHUNK({ bot }: Peril, data: { guild_id: string; members: IGuildMember[] }) {
	const updateMembersFrom = bot.guilds.get(data.guild_id);
	data.members.map((member: IGuildMember) => updateMembersFrom?.members.set(member.user.id, new GuildMember(member, updateMembersFrom)));
}
