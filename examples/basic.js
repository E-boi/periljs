import { Client, Intents, SlashCommand } from "@e-boi/periljs";

const peril = new Client({ token: "bot token", intents: [Intents.GUILD] });

// create a slash command
peril.commands.set(
  new SlashCommand({
    name: "ping",
    description: "example slash command made with periljs",
  }),
  (interaction) => {
    interaction.reply("pong!");
  }
);

peril.on("ready", (bot) => {
  console.log(`logged in as "${bot.tag}"`);
});

// logs in to discord
peril.connect();
