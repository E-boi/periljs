import Peril from '../../peril';

export default function GUILD_ROLE_DELETE({ bot }: Peril, data: { guild_id: string; role_id: string }) {
	const deletedAt = bot.guilds.get(data.guild_id);
	const deletedRole = deletedAt?.roles.get(data.role_id);
	bot.emit('guild.role.delete', deletedRole, deletedAt);
	if (deletedRole) deletedAt?.roles.delete(deletedRole.id.toString());
}
