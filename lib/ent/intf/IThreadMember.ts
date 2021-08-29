import { Snowflake } from '../const/Snowflake';

export default interface IThreadMember {
	id?: Snowflake;
	user_id?: Snowflake;
	join_timestamp: string;
	flags: number;
}
