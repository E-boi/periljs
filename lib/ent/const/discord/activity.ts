/**
 * The types of activities one could have on there RPC
 *
 * @enum {number}
 * @export
 */

export enum ActivtyTypes {
	Game = 0,
	Streaming = 1,
	Listening = 2,
	Watching = 3,
	Custom = 4,
	Competing = 5,
}

/**
 * Flags constants for activities
 *
 * @enum {number}
 * @export
 */

export enum ActivityFlags {
	INSTANCE = 1 << 0,
	JOIN = 1 << 1,
	SPECTATE = 1 << 2,
	JOIN_REQUEST = 1 << 3,
	SYNC = 1 << 4,
	PLAY = 1 << 5,
}

/**
 * The types of activities a message could have
 *
 * @enum {number}
 * @export
 */

export enum MessageActivityTypes {
	JOIN = 1,
	SPECTATE = 2,
	LISTEN = 3,
	JOIN_REQUEST = 5,
}
