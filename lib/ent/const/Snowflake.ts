import { ISnowflake } from '../intf/ISnowflake';
import IEquatable from 'typescript-dotnet-umd/System/IEquatable';
/**
 * Snowflake object.
 * @date 8/8/2021 - 11:49:00 AM
 *
 * @export
 * @class Snowflake
 * @typedef {Snowflake}
 * @implements {ISnowflake}
 * @implements {IEquatable<String | ISnowflake>}
 */
export class Snowflake implements ISnowflake, IEquatable<String | ISnowflake> {
	equals(other: String | ISnowflake): boolean {
		throw new Error('Method not implemented.');
	}
	as<T>(): T {
		throw new Error('Method not implemented.');
	}
	clone(): ISnowflake {
		throw new Error('Method not implemented.');
	}
}
