import { Client, Intents } from '@e-boi/periljs';

const client = new Client({
	token: 'bot token',
	intents: [Intents.GUILDS],
});

client.on('ready', bot => {
	console.log(`logged in as "${bot.tag}"`);
	client.commands.set({ type: 'CHAT_INPUT', name: 'example', description: 'example slash command made with periljs' }, interaction => {
		interaction.reply('hey!!');
	});
});

client.connect();
