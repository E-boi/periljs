// this example will show slash commands doing more then replying

import { Client } from '@e-boi/periljs';

const peril = new Client({ token: 'bot token', intents: ['GUILDS'] });

peril.on('ready', bot => {
  console.log(`logged in as "${bot.tag}"`);
});

// this one replies with button components
peril.commands.set(
  {
    type: 'CHAT_INPUT',
    name: 'components',
    description: 'slash command with components',
  },
  interaction => {
    interaction.reply({
      content: 'Click a button below!',
      components: [
        {
          type: 'Button',
          customId: 'button_one',
          style: 'PRIMARY',
          label: 'Click me!',
        },
        {
          type: 'Button',
          customId: 'button_two',
          style: 'SECONDARY',
          label: 'No me!',
        },
      ],
    });
  }
);

// a command that open a modal, as of now modals can only have "TextInput" components
peril.commands.set(
  { type: 'CHAT_INPUT', name: 'modal', description: 'open a modal' },
  interaction => {
    interaction.modal({
      title: 'Modal!',
      customId: 'modal',
      components: [
        {
          type: 'TextInput',
          customId: 'textinput',
          label: 'Enter something',
          style: 'SHORT',
          required: true,
        },
      ],
    });
  }
);

// this is how to respond to button interactions
peril.on('interaction.button', interaction => {
  if (interaction.button.customId === 'button_one')
    interaction.reply('You clicked the first button!');
  else if (interaction.button.customId === 'button_two')
    interaction.reply('You clicked the second button!');
});

// how to to respond to modal submissions
peril.on('interaction.modal', interaction => {
  if (interaction.modal.customId === 'modal') {
    const value = interaction.getValue('textinput');
    interaction.reply(`modal submission complete! got "${value}"`);
  }
});

peril.connect();
