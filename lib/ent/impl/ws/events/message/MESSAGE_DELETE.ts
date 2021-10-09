import { DeletedMessage } from '../../../../intf/IClientEvents';
import { DMChannel, TextChannel } from '../../../channels';
import Peril from '../../peril';

export default function MESSAGE_DELETE({ bot }: Peril, data: { id: string; channel_id: string; guild_id: string }) {
	const deletedMessage: DeletedMessage = {
		id: data.id,
		channelId: data.channel_id,
		guildId: data.guild_id,
		channel: bot.channels.get(data.channel_id) as TextChannel | DMChannel,
		guild: bot.guilds.get(data.guild_id),
	};
	bot.emit('message.delete', deletedMessage);
}
