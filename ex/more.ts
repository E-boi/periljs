// this example will show using components specifically buttons in slash commands
// one neat thing is that periljs will automatically wrap your components in the "Action Row" component

import { Client, Intents } from '@e-boi/periljs';

const client = new Client({ clientAuthentication: { token: 'a token here' }, intents: [Intents.GUILDS] });

client.on('ready', () => {
	client.setCommand({ type: 'CHAT_INPUT', name: 'example', description: 'example slash command made with periljs' });
});

client.on('interaction.slash', interaction => {
	if (interaction.command.name === 'example')
		interaction.reply({
			content: 'Click a button below!',
			components: [
				[
					{ type: 'Button', custom_id: 'button_one', style: 'PRIMARY', label: 'Click me!' },
					{ type: 'Button', custom_id: 'button_two', style: 'SECONDARY', label: 'No me!' },
				],
			],
		});
});

client.on('interaction.button', interaction => {
	if (interaction.button.custom_id === 'button_one') interaction.reply('You clicked the first button!');
	else if (interaction.button.custom_id === 'button_two') interaction.reply('You clicked the second button!');
});

client.connect();
