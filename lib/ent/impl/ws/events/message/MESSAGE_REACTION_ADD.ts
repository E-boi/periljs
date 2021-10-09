import IEmoji from '../../../../intf/guild/IEmoji';
import IGuildMember from '../../../../intf/guild/IGuildMember';
import { DMChannel, TextChannel } from '../../../channels';
import Guild from '../../../guild/Guild';
import Emoji from '../../../guild/GuildEmoji';
import { GuildMember } from '../../../guild/GuildMember';
import Message from '../../../Message';
import Peril from '../../peril';
import User from '../../../User';

export type ReactionAdd = {
	channel?: TextChannel | DMChannel;
	guild?: Guild;
	message: Message;
	member?: GuildMember;
	user: User;
	emoji: Emoji;
};

export default async function (
	{ bot }: Peril,
	data: { user_id: string; channel_id: string; message_id: string; guild_id?: string; member?: IGuildMember; emoji: IEmoji }
) {
	const channel = bot.channels.get(data.channel_id);
	const guild = data.guild_id && bot.guilds.get(data.guild_id);
	const message = await bot.HTTP.getMessage(data.message_id, data.channel_id);
	const user = await bot.getUserByID(data.user_id);
	const member = data.member && guild && new GuildMember(data.member, guild);
	const emoji = new Emoji(data.emoji);
	bot.emit('message.reaction.add', { channel, guild, message, user, member, emoji } as ReactionAdd);
}
