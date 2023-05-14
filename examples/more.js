// this example will show slash commands doing more then replying

import {
  ActionRow,
  Button,
  ButtonStyle,
  Client,
  Intents,
  SlashCommand,
  TextInput,
} from "@e-boi/periljs";

const peril = new Client({ token: "bot token", intents: [Intents.GUILD] });

peril.on("ready", (bot) => {
  console.log(`logged in as "${bot.tag}"`);
});

// this one replies with button components
peril.commands.set(
  new SlashCommand({
    name: "components",
    description: "slash command with components",
  }),
  (interaction) => {
    interaction.reply({
      content: "Click a button below!",
      components: [
        new ActionRow(
          new Button({ customId: "button_one", style: ButtonStyle.PRIMARY, label: "Click me!" }),
          new Button({ customId: "button_two", style: ButtonStyle.SECONDARY, label: "No me!" })
        ),
      ],
    });
  }
);

// a command that open a modal, as of now modals can only have "TextInput" components
peril.commands.set(
  new SlashCommand({ name: "modal", description: "open a modal" }),
  (interaction) => {
    interaction.modalReply({
      customId: "modal",
      title: "Modal!",
      components: [
        new ActionRow(
          new TextInput({ customId: "textinput", label: "Enter something", required: true })
        ),
      ],
    });
  }
);

// this is how to respond to button interactions
peril.on("interaction.button", (interaction) => {
  if (interaction.button.customId === "button_one")
    interaction.reply({ content: "You clicked the first button!" });
  else if (interaction.button.customId === "button_two")
    interaction.reply({ context: "You clicked the second button!" });
});

// how to to respond to modal submissions
peril.on("interaction.modal", (interaction) => {
  if (interaction.modal.customId === "modal") {
    const value = interaction.getValue("textinput");
    interaction.reply({ content: `modal submission complete! got "${value}"` });
  }
});

peril.connect();
