import Peril from '../../peril';

export default function GUILD_DELETE({ bot }: Peril, data: { id: string; unavailible: boolean }) {
	const guild = bot.guilds.get(data.id);
	if (!data.unavailible) bot.guilds.delete(data.id);
	bot.emit('guild.delete', guild);
}
