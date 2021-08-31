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
