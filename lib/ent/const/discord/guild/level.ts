/**
 * @date 8/28/21 - 12:13:14 PM
 *
 * @export
 * @enum {number}
 */

export enum PremiumTypes {
	NONE = 0,
	TIER_1 = 1,
	TIER_2 = 2,
	TIER_3 = 3,
}

/**
 * @date 8/28/21 - 12:15:32 PM
 *
 * @export
 * @enum {number}
 */

export enum NSFWLevel {
	DEFAULT = 0,
	EXPLICOT = 1,
	SAFE = 2,
	AGE_RESTRICTED = 3,
}

/**
 * @date 8/28/21 - 3:40:20 PM
 *
 * @export
 * @enum {number}
 */

export enum PrivacyLevel {
	PUBLIC = 1,
	GUILD_ONLY = 2,
}
