import SlashInteraction from '../impl/interactions/SlashInteraction';
import UserInteraction from '../impl/interactions/UserInteraction';
import MessageInteraction from '../impl/interactions/MessageInteraction';
import ButtonInteraction from '../impl/interactions/ButtonInteraction';
import SelectMenuInteraction from '../impl/interactions/SelectMenuInteraction';
import { DMChannel, Guild, GuildMember } from '../../..';
import Message from '../impl/Message';
import TextChannel from '../impl/channels/TextChannel';
import VoiceChannel from '../impl/channels/VoiceChannel';
import ThreadChannel from '../impl/channels/ThreadChannel';
import Category from '../impl/channels/Category';
import User, { ClientUser } from '../impl/User';
import Role from '../impl/guild/Role';
import Invite, { DeletedInvite } from '../impl/Invite';
import { ReactionAdd } from '../impl/ws/events/message/MESSAGE_REACTION_ADD';
import { ReactionRemove } from '../impl/ws/events/message/MESSAGE_REACTION_REMOVE';
import { PresenceUpdateFields } from '../impl/ws/events/PRESENCE_UPDATE';

export interface DeletedMessage {
	id: string;
	channelId: string;
	guildId?: string;
	guild?: Guild;
	channel?: TextChannel | DMChannel;
}

export interface DeletedMessages {
	ids: string[];
	channelId: string;
	guildId?: string;
	guild?: Guild;
	channel?: TextChannel | DMChannel;
}

export default interface IClientEvents<T> {
	(event: 'ready', listener: (user: ClientUser) => void): T;
	(event: 'guild.create', listener: (guild: Guild) => void): T;
	(event: 'guild.update', listener: (before: Guild, now: Guild) => void): T;
	(event: 'guild.delete', listener: (guild: Guild) => void): T;
	(event: 'guild.ban.add', listener: (user: User, guild: Guild) => void): T;
	(event: 'guild.ban.remove', listener: (user: User, guild: Guild) => void): T;
	(event: 'guild.member.join', listener: (member: GuildMember, guild: Guild) => void): T;
	(event: 'guild.member.leave', listener: (user: User, guild: Guild) => void): T;
	(event: 'guild.member.update', listener: (before: GuildMember, now: GuildMember, guild: Guild) => void): T;
	(event: 'guild.role.create', listener: (role: Role, guild: Guild) => void): T;
	(event: 'guild.role.update', listener: (before: Role, now: Role, guild: Guild) => void): T;
	(event: 'guild.role.delete', listener: (role: Role, guild: Guild) => void): T;
	(event: 'channel.create', listener: (channel: TextChannel | VoiceChannel | ThreadChannel | Category) => void): T;
	(
		event: 'channel.update',
		listener: (
			oldChannel: TextChannel | VoiceChannel | ThreadChannel | Category,
			channel: TextChannel | VoiceChannel | ThreadChannel | Category
		) => void
	): T;
	(event: 'channel.delete', listener: (channel: TextChannel | VoiceChannel | ThreadChannel | Category) => void): T;
	(event: 'thread.create', listener: (thread: ThreadChannel) => void): T;
	(event: 'thread.update', listener: (oldthread: ThreadChannel, thread: ThreadChannel) => void): T;
	(event: 'thread.delete', listener: (thread: ThreadChannel) => void): T;
	(event: 'message.create', listener: (message: Message) => void): T;
	(event: 'message.update', listener: (message: Message) => void): T;
	(event: 'message.delete', listener: (message: DeletedMessage) => void): T;
	(event: 'message.reaction.add', listener: (reaction: ReactionAdd) => void): T;
	(event: 'message.reaction.remove', listener: (reaction: ReactionRemove) => void): T;
	(event: 'message.bulk.delete', listener: (message: DeletedMessages) => void): T;
	(event: 'interaction.slash', listener: (interaction: SlashInteraction) => void): T;
	(event: 'interaction.user', listener: (interaction: UserInteraction) => void): T;
	(event: 'interaction.message', listener: (interaction: MessageInteraction) => void): T;
	(event: 'interaction.button', listener: (interaction: ButtonInteraction) => void): T;
	(event: 'interaction.selectMenu', listener: (interaction: SelectMenuInteraction) => void): T;
	(event: 'invite.create', listener: (invite: Invite) => void): T;
	(event: 'invite.delete', listener: (invite: DeletedInvite) => void): T;
	(event: 'presence.update', listener: (presence: PresenceUpdateFields) => void): T;
}
