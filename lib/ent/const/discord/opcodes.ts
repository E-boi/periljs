export enum Opcode {
	DISPATCH = 0,
	HEARTBEAT = 1,
	IDENTIFY = 2,
	PRESENCE_UPDATE = 3,
	VOICE_STATE_UPDATE = 4,
	RESUME = 5,
	RECONNECT = 6,
	REQUEST_GUILD_MEMBERS = 7,
	INVALID_SESSION = 8,
	HELLO = 9,
	HEARTBEAT_ACK = 10,
}
export enum Closecode {
	UNKNOWN_ERROR = 4000,
	UNKNOWN_OPCODE = 4001,
	DECODE_ERROR = 4002,
	NOT_AUTHENTICATED = 4003,
	AUTHENTICATION_FAILED = 4004,
	ALREADY_AUTHENTICATED = 4005,
	INVALID_SEQ = 4007,
	RATE_LIMITED = 4008,
	SESSION_TIMED_OUT = 4009,
	INVALID_SHARD = 4010,
	SHARDING_REQUIRED = 4011,
	INVALID_API_VERSION = 4012,
	INVALID_INTENTS = 4013,
	DISALLOWED_INTENTS = 4014,
}
export enum Voicecode {}
export enum JSONcode {
	GENERAL_ERROR = 0,
	UNKNOWN_ACCOUNT = 10001,
	UNKNOWN_APPLICATION = 10002,
	UNKNOWN_CHANNEL = 10003,
	UNKNOWN_GUILD = 10004,
	UNKNOWN_INTEGRATION = 10005,
	UNKNOWN_INVITE = 10006,
	UNKNOWN_MEMBER = 10007,
	UNKNOWN_MESSAGE = 10008,
	UNKNOWN_PERMISSION_OVERWRITE = 10009,
	UNKNOWN_PROVIDER = 10010,
	UNKNOWN_ROLE = 10011,
	UNKNOWN_TOKEN = 10012,
	UNKNOWN_USER = 10013,
	UNKNOWN_EMOJI = 10014,
	UNKNOWN_WEBHOOK = 10015,
	UNKNOWN_WEBHOOK_SERVICE = 10016,
	UNKNOWN_SESSION = 10020,
	UNKNOWN_BAN = 10026,
	UNKNOWN_SKU = 10027,
	UNKNOWN_STORE_LISTING = 10028,
	UNKNOWN_ENTITLEMENT = 10029,
	UNKNOWN_BUILD = 10030,
	UNKNOWN_LOBBY = 10031,
	UNKNOWN_BRANCH = 10032,
	UNKNOWN_STORE_DIRECTORY_LAYOUT = 10033,
	UNKNOWN_REDISTRIBUTABLE = 10036,
	UNKNOWN_GIFT_CODE = 10038,
	UNKNOWN_GUILD_TEMPLATE = 10057,
	UNKNOWN_DISCOVERABLE_SERVER_CATEGORY = 10059,
	UNKNOWN_STICKER = 10060,
	UNKNOWN_INTERACTION = 10062,
	UNKNOWN_APPLICATION_COMMAND = 10063,
	UNKNOWN_APPLICATION_COMMAND_PERMISSIONS = 10066,
	UNKNOWN_STAGE_INSTANCE = 10067,
	UNKNOWN_GUILD_MEMBER_VERIFICATION_FORM = 10068,
	UNKNOWN_GUILD_WELCOME_SCREEN = 10069,
	NO_BOTS_ALLOWED = 20001,
	ONLY_BOTS_ALLOWED = 20002,
	CONTENT_EXPLICIT = 20009,
	UNAUTHORIZED_APPLICATION_OPERATION = 20012,
	SLOWMODE_LIMITED = 20016,
	OWNER_ONLY = 20018,
	ANNOUNCEMENT_EDIT_LIMIT = 20022,
	CHANNEL_WRITE_LIMIT_HIT = 20028,
	OBJECT_NAME_CONTAINS_BLACKLISTED_WORDS = 20031,
	NOT_BOOSTED_ENOUGH = 20035,
	MAXIMUM_NUMBER_OF_GUILDS_REACHED = 30001,
	MAXIMUM_NUMBER_OF_FRIENDS_REACHED = 30002,
	MAXIMUM_NUMBER_OF_PINS_REACHED_FOR_THE_CHANNEL = 30003,
	MAXIMUM_NUMBER_OF_RECIPIENTS_REACHED = 30004,
	MAXIMUM_NUMBER_OF_GUILD_ROLES_REACHED = 30005,
	MAXIMUM_NUMBER_OF_WEBHOOKS_REACHED = 30007,
	MAXIMUM_NUMBER_OF_EMOJIS_REACHED = 30008,
	MAXIMUM_NUMBER_OF_REACTIONS_REACHED = 30010,
	MAXIMUM_NUMBER_OF_GUILD_CHANNELS_REACHED = 30013,
	MAXIMUM_NUMBER_OF_ATTACHMENTS_IN_A_MESSAGE_REACHED = 30015,
	MAXIMUM_NUMBER_OF_INVITES_REACHED = 30016,
	MAXIMUM_NUMBER_OF_ANIMATED_EMOJIS_REACHED = 30018,
	MAXIMUM_NUMBER_OF_SERVER_MEMBERS_REACHED = 30019,
	MAXIMUM_NUMBER_OF_SERVER_CATEGORIES_HAS_BEEN_REACHED = 30030,
	TEMPLATE_ALREADY_EXISTS = 30031,
	MAX_NUMBER_OF_THREAD_PARTICIPANTS_HAS_BEEN_REACHED = 30033,
	NON_GUILDMEMBER_BAN_LIMIT_EXCEEDED = 30035,
	MAXIMUM_NUMBER_OF_BANS_FETCHES_HAS_BEEN_REACHED = 30037,
	MAXIMUM_NUMBER_OF_STICKERS_REACHED = 30039,
	TOKEN_INVALID = 40001,
	ACCOUNT_VERIFY_NECCESARY = 40002,
	YOU_ARE_OPENING_DIRECT_MESSAGES_TOO_FAST = 40003,
	PAYLOAD_TOO_LARGE = 40005,
	DISCORD_MOMENT = 40006,
	THE_USER_IS_BANNED_FROM_THIS_GUILD = 40007,
	TARGET_USER_IS_NOT_CONNECTED_TO_VOICE = 40032,
	THIS_MESSAGE_HAS_ALREADY_BEEN_CROSSPOSTED = 40033,
	AN_APPLICATION_COMMAND_WITH_THAT_NAME_ALREADY_EXISTS = 40041,
	MISSING_ACCESS = 50001,
	INVALID_ACCOUNT_TYPE = 50002,
	CANNOT_EXECUTE_ACTION_ON_A_DM_CHANNEL = 50003,
	GUILD_WIDGET_DISABLED = 50004,
	CANNOT_EDIT_A_MESSAGE_AUTHORED_BY_ANOTHER_USER = 50005,
	CANNOT_SEND_AN_EMPTY_MESSAGE = 50006,
	CANNOT_SEND_MESSAGES_TO_THIS_USER = 50007,
	CANNOT_SEND_MESSAGES_IN_A_VOICE_CHANNEL = 50008,
	CHANNEL_VERIFICATION_LEVEL_IS_TOO_HIGH_FOR_YOU_TO_GAIN_ACCESS = 50009,
	OAUTH2_APPLICATION_DOES_NOT_HAVE_A_BOT = 50010,
	OAUTH2_APPLICATION_LIMIT_REACHED = 50011,
	INVALID_OAUTH2_STATE = 50012,
	YOU_LACK_PERMISSIONS_TO_PERFORM_THAT_ACTION = 50013,
	INVALID_AUTHENTICATION_TOKEN_PROVIDED = 50014,
	NOTE_WAS_TOO_LONG = 50015,
	INVALID_BULK_DELETE_COUNT = 50016,
	A_MESSAGE_CAN_ONLY_BE_PINNED_TO_THE_CHANNEL_IT_WAS_SENT_IN = 50019,
	INVITE_CODE_WAS_EITHER_INVALID_OR_TAKEN = 50020,
	CANNOT_EXECUTE_ACTION_ON_A_SYSTEM_MESSAGE = 50021,
	CANNOT_EXECUTE_ACTION_ON_THIS_CHANNEL_TYPE = 50024,
	INVALID_OAUTH2_ACCESS_TOKEN_PROVIDED = 50025,
	MISSING_REQUIRED_OAUTH2_SCOPE = 50026,
	INVALID_WEBHOOK_TOKEN_PROVIDED = 50027,
	INVALID_ROLE = 50028,
	INVALID_RECIPIENT = 50033,
	MESSAGE_AGE_EXCEEDS_BULK_DELETE_LIMIT = 50034,
	INVALID_PAYLOAD = 50035,
	SOMETHING_ABOUT_INVALID_INVITE_ACCEPTS = 50036,
	INVALID_API_VERSION_PROVIDED = 50041,
	FILE_UPLOADED_EXCEEDS_THE_MAXIMUM_SIZE = 50045,
	INVALID_FILE_UPLOADED = 50046,
	CANNOT_LEECH_GIFT = 50054,
	PAYMENT_SOURCE_REQUIRED_TO_REDEEM_GIFT = 50070,
	CANNOT_DELETE_A_CHANNEL_REQUIRED_FOR_COMMUNITY_GUILDS = 50074,
	INVALID_STICKER_SENT = 50081,
	THREAD_IS_ARCHIVED = 50083,
	INVALID_THREAD_NOTIFICATION_SETTINGS = 50084,
	SEARCH_TIME_INVALID_THREAD_AGE = 50085,
	TWO_FACTOR_IS_REQUIRED_FOR_THIS_OPERATION = 60003,
	NO_USERS_WITH_DISCORDTAG_EXIST = 80004,
	REACTION_WAS_BLOCKED = 90001,
	DISCORD_SERVER_OWNED = 130000,
	THE_STAGE_IS_ALREADY_OPEN = 150006,
	THREAD_ALREADY_EXISTS = 160004,
	THREAD_IS_LOCKED = 160005,
	MAXIMUM_NUMBER_OF_ACTIVE_THREADS_REACHED = 160006,
	MAXIMUM_NUMBER_OF_ACTIVE_ANNOUNCEMENT_THREADS_REACHED = 160007,
	INVALID_LOTTIE_JSON = 170001,
	UPLOADED_LOTTIES_CANNOT_CONTAIN_RASTER_IMAGES = 170002,
	STICKER_MAXIMUM_FRAMERATE_EXCEEDED = 170003,
	STICKER_FRAME_COUNT_EXCEEDS_MAXIMUM_OF_1000_FRAMES = 170004,
	LOTTIE_ANIMATION_MAXIMUM_DIMENSIONS_EXCEEDED = 170005,
	STICKER_FRAME_RATE_IS_EITHER_TOO_SMALL_OR_TOO_LARGE = 170006,
	STICKER_ANIMATION_DURATION_EXCEEDS_MAXIMUM_OF_5_SECONDS = 170007,
}
