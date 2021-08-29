import { ApplicationFlags } from '../const/discord/flags';
import { MembershipStates } from '../const/discord/team';
import { Snowflake } from '../const/Snowflake';
import { IUser } from './user/IUser';

export default interface IApplication {
	id: Snowflake;
	name: string;
	icon?: string;
	description: string;
	rpc_origins?: string[];
	bot_public: boolean;
	bot_require_code_grant: boolean;
	terms_of_service_url?: string;
	privacy_policy_url?: string;
	owner?: IUser;
	summary: string;
	verify_key: string;
	team: ITeam;
	guild_id?: Snowflake;
	primary_sku_id?: Snowflake;
	slug?: string;
	cover_image?: string;
	flags?: ApplicationFlags;
}

export interface ITeam {
	icon?: string;
	id: Snowflake;
	members: ITeamMember;
	name: string;
	owner_user_id: Snowflake;
}

export interface ITeamMember {
	membership_state: MembershipStates;
	permissions: string[];
	team_id: Snowflake;
	user: IUser;
}
