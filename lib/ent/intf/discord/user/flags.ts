export enum UserFlags {
    None = 0,
    DISCORD_EMPLOYEE = 1 << 0,
    PARTNERED_SERVER_OWNER = 1 << 1,
    HYPESQUAD_EVENTS = 1 << 2,
    BUG_HUNTER_LEVEL_ONE = 1 << 3,
    HOUSE_BRAVERY = 1 << 4,
    HOUSE_BRILLIANCE = 1 << 5,
    HOUSE_BALANCE = 1 << 6,
    EARLY_SUPPORTER = 1 << 7,
    TEAM_USER = 1 << 8,
    BUG_HUNTER_LEVEL_TWO = 1 << 9,
    VERIFIED_BOT = 1 << 10,
    EARLY_VERIFIED_BOT_DEVELOPER = 1 << 11,
    DISCORD_CERTIFIED_MODERATOR = 1 << 12
}
export enum PremiumTypes {
    NONE = 0,
    CLASSIC = 1,
    NITRO = 2,
}