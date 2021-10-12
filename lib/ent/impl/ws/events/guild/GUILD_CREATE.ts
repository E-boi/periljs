import IGuild from '../../../../intf/guild/IGuild';
import Guild from '../../../guild/Guild';
import Peril from '../../peril';

export default function GUILD_CREATE(ws: Peril, data: IGuild) {
	const createdGuild: Guild = new Guild(data, ws.bot.HTTP);
	ws.bot.guilds.set(createdGuild.id.toString(), createdGuild);
	createdGuild.channels.forEach(channel => ws.bot.channels.set(channel.id.toString(), channel));
	if (ws.bot.getAllMembers) ws.send(JSON.stringify({ op: 8, d: { guild_id: [data.id], query: '', limit: 0 } }));
	ws.bot.emit('guild.create', createdGuild);
}
