import IActivity from '../../../intf/IActivity';
import IClientStatus from '../../../intf/IClientStatus';
import IPresenceUpdate from '../../../intf/IPresenceUpdate';
import Guild from '../../guild/Guild';
import User from '../../User';
import Peril from '../peril';

export type PresenceUpdateFields = {
	user: User;
	guild?: Guild;
	status: 'idle' | 'online' | 'dnd' | 'offline';
	activities: IActivity[];
	client_status: IClientStatus;
};

export default function PRESENCE_UPDATE({ bot }: Peril, data: IPresenceUpdate) {
	const user = new User(data.user);
	const guild = bot.guilds.get(data.guild_id);
	bot.emit('presence.update', {
		user,
		guild,
		status: data.status,
		activities: data.activities,
		client_status: data.client_status,
	} as PresenceUpdateFields);
}
