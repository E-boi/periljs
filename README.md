# periljs

> **[NPM](https://www.npmjs.com/package/@e-boi/periljs)** | **[Discord](https://discord.gg/qbERr28Dxt)**

A library for interaction with Discord

## Installation

```
npm i @e-boi/periljs
```

## Basic Usage

```js
// this example shows a basic usage of slash commands

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
```

<p style="font-size: 12px;">More examples can be found <a href="https://github.com/E-boi/periljs/tree/main/examples">here</a></p>

## Documentation

**coming soon**
