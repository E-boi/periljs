import { DMChannel, TextChannel } from '../../../channels';
import Guild from '../../../guild/Guild';
import Emoji from '../../../guild/GuildEmoji';
import Message from '../../../Message';
import User from '../../../User';
import Peril from '../../peril';

export type ReactionRemove = {
	channel?: TextChannel | DMChannel;
	guild?: Guild;
	message: Message;
	user: User;
	emoji: Emoji;
};

export default async function MESSAGE_REACTION_REMOVE({ bot }: Peril, data: any) {
	const channel = bot.channels.get(data.channel_id);
	const guild = data.guild_id ? bot.guilds.get(data.guild_id) : null;
	const message = await bot.HTTP.getMessage(data.message_id, data.channel_id);
	const user = await bot.getUserByID(data.user_id);
	const emoji = new Emoji(data.emoji);
	bot.emit('message.reaction.remove', { channel, guild, message, user, emoji } as ReactionRemove);
}
