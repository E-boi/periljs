import { IApplicationCommand } from '../intf/IApplicationCommand';
import { IMessageCommandCreate, ISlashCreate, IUserCommandCreate } from '../intf/IInteraction';
import Client from './client';
import { MessageInteraction, SlashInteraction, UserInteraction } from './interactions';

export default class Commands {
	private commands: Map<string, (interaction: SlashInteraction | UserInteraction | MessageInteraction) => void> = new Map();
	private bot: Client;

	constructor(bot: Client) {
		this.bot = bot;

		bot.on('interaction.slash', interaction => {
			const command = this.commands.get(interaction.command.id);
			command?.(interaction);
		});
		bot.on('interaction.user', interaction => {
			const command = this.commands.get(interaction.command.id);
			command?.(interaction);
		});
		bot.on('interaction.message', interaction => {
			const command = this.commands.get(interaction.command.id);
			command?.(interaction);
		});
	}

	async getGlobalCommands(): Promise<IApplicationCommand[]> {
		if (!this.bot.bot) return [];
		return this.bot.HTTP.getIntercationCommands();
	}

	async getGuildCommands(guildId: string) {
		if (!this.bot.bot) return [];
		return this.bot.HTTP.getGuildInteraction(guildId);
	}

	async deleteGuildCommand(commandId: string, guildId: string) {
		if (!this.bot.bot) throw Error('Cannot delete commands before logging in!');
		return this.bot.HTTP.deleteGuildInteraction(commandId, guildId);
	}

	async delete(commandId: string) {
		if (!this.bot.bot) throw Error('Cannot delete commands before logging in!');
		return this.bot.HTTP.deleteInteraction(commandId);
	}

	async setGuildCommand(
		command: ISlashCreate | IUserCommandCreate | IMessageCommandCreate,
		guildID: string,
		handler: (interaction: SlashInteraction | UserInteraction | MessageInteraction) => void
	) {
		if (!this.bot.bot) throw Error('Cannot set commands before logging in!');
		const req = await this.bot.HTTP.setGuildInteraction(command, guildID);
		const json: IApplicationCommand[] = await req.json();
		json.forEach(c => this.commands.set(c.id, handler));
	}

	async set(
		command: ISlashCreate | IUserCommandCreate | IMessageCommandCreate,
		handler: (interaction: SlashInteraction | UserInteraction | MessageInteraction) => void
	) {
		if (!this.bot.bot) throw Error('Cannot set command before logging in!');
		const req = await this.bot.HTTP.setInteraction(command);
		const json: IApplicationCommand[] = await req.json();
		json.forEach(c => this.commands.set(c.id, handler));
	}
}
