import IGuild from '../../../../intf/guild/IGuild';
import Guild from '../../../guild/Guild';
import Peril from '../../peril';

export default function GUILD_CREATE({ bot, send }: Peril, data: IGuild) {
	const createdGuild: Guild = new Guild(data, bot.HTTP);
	bot.guilds.set(createdGuild.id.toString(), createdGuild);
	createdGuild.channels.forEach(channel => bot.channels.set(channel.id.toString(), channel));
	if (bot.getAllMembers) send(JSON.stringify({ op: 8, d: { guild_id: [data.id], query: '', limit: 0 } }));
	bot.emit('guild.create', createdGuild);
}
