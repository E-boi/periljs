import { Snowflake } from '../../const/Snowflake';

export function getDateFromID(snowflake: string | Snowflake) {
	return new Date(Math.floor(Number(BigInt(snowflake.toString()) / 4194304n + 1420070400000n)));
}
