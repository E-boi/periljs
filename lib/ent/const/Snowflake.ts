import { ISnowflake } from '../intf/ISnowflake';

/**
 * Snowflake object.
 * @date 8/8/2021 - 11:49:00 AM
 *
 * @export
 * @class Snowflake
 * @typedef {Snowflake}
 * @implements {ISnowflake}
 * @extends {String}
 */

export class Snowflake extends String implements ISnowflake {
	equals(other: String | Snowflake): boolean {
		if (other.toString() === this.toString()) return true;
		return false;
	}
	as<T>(): T {
		return this as unknown as T;
	}
}
