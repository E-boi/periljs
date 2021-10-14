# periljs

A nodejs api wrapper for discord!

## Installation

```
npm i @e-boi/periljs
```

## Basic Usage

```js
// this example shows a basic usage of slash commands

import { Client, Intents } from '@e-boi/periljs';

const client = new Client({ token: 'a token here', intents: [Intents.GUILDS] });

client.on('ready', () => {
	client.commands.set({ type: 'CHAT_INPUT', name: 'example', description: 'example slash command made with periljs' }, interaction => {
		interaction.reply('hey!!');
	});
});

client.connect();
```

<p style="font-size: 12px;">More example can be found <a href="https://github.com/E-boi/periljs/tree/main/ex">here</a></p>

## Documentation

**coming soon**
