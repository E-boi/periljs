import IRole from '../../../../intf/guild/IRole';
import Role from '../../../guild/Role';
import Peril from '../../peril';

export default function GUILD_ROLE_UPDATE({ bot }: Peril, data: { guild_id: string; role: IRole }) {
	const updatedAt = bot.guilds.get(data.guild_id);
	const updatedRole = new Role(data.role);
	const beforeRole = updatedAt?.roles.get(data.role.id);
	bot.emit('guild.role.update', beforeRole, updatedRole, updatedAt);
	updatedAt?.roles.set(updatedRole.id.toString(), updatedRole);
}
