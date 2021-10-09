import { DeletedMessages } from '../../../../intf/IClientEvents';
import { DMChannel, TextChannel } from '../../../channels';
import Peril from '../../../peril';

export default function MESSAGE_DELETE({ bot }: Peril, data: { id: string[]; channel_id: string; guild_id?: string }) {
	const deletedMessages: DeletedMessages = {
		ids: data.id,
		channelId: data.channel_id,
		guildId: data.guild_id,
		guild: data.guild_id ? bot.guilds.get(data.guild_id) : undefined,
		channel: bot.channels.get(data.channel_id) as TextChannel | DMChannel,
	};
	bot.emit('message.bulk.delete', deletedMessages);
}
