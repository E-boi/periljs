/**
 * Discord Interaction Types
 *
 * @enum {number}
 * @export
 */

export enum InteractionTypes {
	PING = 1,
	APPLICATION_COMMAND = 2,
	MESSAGE_COMPONENT = 3,
}

/**
 * Discord Component Types
 *
 * @enum {number}
 * @export
 */

export enum ComponentTypes {
	ActionRow = 1,
	Button = 2,
	SelectMenu = 3,
}

export enum ApplicationCommandTypes {
	CHAT_INPUT = 1,
	USER = 2,
	MESSAGE = 3,
}

export enum ApplicationCommandOptionType {
	SUB_COMMAND = 1,
	SUB_COMMAND_GROUP = 2,
	STRING = 3,
	INTEGER = 4,
	BOOLEAN = 5,
	USER = 6,
	CHANNEL = 7,
	ROLE = 8,
	MENTIONABLE = 9,
	NUMBER = 10,
}

export enum InteractionCallbackTypes {
	PONG = 1,
	MESSAGE = 4,
}

export enum InteractionCallbackFlags {
	EPHEMERAL = 1 << 6,
}
