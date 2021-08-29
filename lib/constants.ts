import { Opcode, Closecode, JSONcode, Voicecode } from './ent/const/discord/opcodes';
import { Permissions } from './ent/const/discord/permissions';
import { Intents } from './ent/const/discord/intents';
import { UserFlags } from './ent/const/discord/user/flags';
import { ActivityFlags, ActivtyTypes, MessageActivityTypes } from './ent/const/discord/activity';
import { GuildFeatures } from './ent/const/discord/guild/features';
import { NSFWLevel, PremiumTypes, PrivacyLevel } from './ent/const/discord/guild/level';
import { StickerTypes, StickerFormatTypes } from './ent/const/discord/guild/sticker';
const WS_URI = 'wss://gateway.discord.gg/?v=9&encoding=json';
const API_URI = 'https://discord.com/api/';
export {
	WS_URI,
	API_URI,
	Opcode,
	Closecode,
	JSONcode,
	Voicecode,
	Permissions,
	Intents,
	UserFlags,
	ActivityFlags,
	ActivtyTypes,
	MessageActivityTypes,
	GuildFeatures,
	NSFWLevel,
	PremiumTypes,
	PrivacyLevel,
	StickerTypes,
	StickerFormatTypes,
};
