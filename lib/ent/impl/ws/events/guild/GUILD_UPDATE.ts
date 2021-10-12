import IGuild from '../../../../intf/guild/IGuild';
import Guild from '../../../guild/Guild';
import Peril from '../../peril';

export default function GUILD_UPDATE({ bot }: Peril, data: IGuild) {
	const before = bot.guilds.get(data.id);
	if (!before) return;
	const now = new Guild(data, bot.HTTP);
	bot.guilds.set(before.id, now);
	bot.emit('guild.update', before, now);
}
