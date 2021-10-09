import IRole from '../../../../intf/guild/IRole';
import Role from '../../../guild/Role';
import Peril from '../../peril';

export default function GUILD_ROLE_CREATE({ bot }: Peril, data: { guild_id: string; role: IRole }) {
	const createdRole = new Role(data.role);
	const createdAt = bot.guilds.get(data.guild_id);
	bot.emit('guild.role.create', createdRole, createdAt);
	createdAt?.roles.set(createdRole.id.toString(), createdRole);
}
