import { Client } from '@e-boi/periljs';

const peril = new Client({ token: 'bot token', intents: ['GUILDS'] });

// create a slash command
peril.commands.set(
  {
    type: 'CHAT_INPUT',
    name: 'ping',
    description: 'example slash command made with periljs',
  },
  interaction => {
    interaction.reply('pong!');
  }
);

peril.on('ready', bot => {
  console.log(`logged in as "${bot.tag}"`);
});

// logs in to discord
peril.connect();
