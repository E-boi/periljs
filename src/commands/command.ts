import { RawApplicationCommandOption, RawApplicationCommandOptionChoice } from "../rawTypes";
import { ChannelTypes, CommandOptionTypes } from "../enums";

interface CommandChoiceFields {
  name: string;
  nameLocalizations: Map<string, string>;
  value: string | number;
}

export class CommandChoice implements CommandChoiceFields {
  name: string;
  nameLocalizations: Map<string, string> = new Map();
  value: string | number;

  constructor(choice: Omit<CommandChoiceFields, "nameLocalizations">) {
    this.name = choice.name;
    this.value = choice.value;
  }

  toJson(): RawApplicationCommandOptionChoice {
    const choice: RawApplicationCommandOptionChoice = {
      name: this.name,
      value: this.value,
      name_localizations: this.nameLocalizations.size > 0 ? {} : undefined,
    };

    this.nameLocalizations?.forEach((local, lang) => {
      choice.name_localizations![lang] = local;
    });

    return choice;
  }
}
interface CommandOptionFields {
  type: CommandOptionTypes;
  name: string;
  nameLocalizations?: Map<string, string>;
  description: string;
  descriptionLocalizations?: Map<string, string>;
  required?: boolean;
  choices?: CommandChoice[];
  // eslint-disable-next-line no-use-before-define
  options?: CommandOption[];
  channelTypes?: ChannelTypes[];
  minValue?: number;
  maxValue?: number;
  minLength?: number;
  maxLength?: number;
}

export class CommandOption implements CommandOptionFields {
  type: CommandOptionTypes;
  name: string;
  nameLocalizations: Map<string, string> = new Map();
  description: string;
  descriptionLocalizations: Map<string, string> = new Map();
  required?: boolean;
  choices?: CommandChoice[];
  // eslint-disable-next-line no-use-before-define
  options?: CommandOption[];
  channelTypes?: ChannelTypes[];
  minValue?: number;
  maxValue?: number;
  minLength?: number;
  maxLength?: number;

  constructor(option: Omit<CommandOptionFields, "nameLocalizations" | "descriptionLocalizations">) {
    this.type = option.type;
    this.name = option.name;
    this.description = option.description;
    this.required = option.required;
    this.choices = option.choices;
    this.options = option.options;
    this.channelTypes = option.channelTypes;
    this.maxValue = option.maxValue;
    this.minValue = option.minValue;
    this.maxLength = option.maxLength;
    this.minLength = option.minLength;
  }

  toJson(): RawApplicationCommandOption {
    const option: RawApplicationCommandOption = {
      name: this.name,
      name_localizations: this.nameLocalizations.size > 0 ? {} : undefined,
      type: this.type,
      description: this.description,
      description_localizations: this.descriptionLocalizations.size > 0 ? {} : undefined,
      required: this.required,
      choices: this.choices?.map((choice) => choice.toJson()),
      options: this.options?.map((option) => option.toJson()),
      channel_types: this.channelTypes,
      max_value: this.maxValue,
      min_value: this.minValue,
      max_length: this.maxLength,
      min_length: this.minValue,
    };

    this.nameLocalizations?.forEach((local, lang) => {
      option.name_localizations![lang] = local;
    });

    this.descriptionLocalizations?.forEach((local, lang) => {
      option.description_localizations![lang] = local;
    });

    return option;
  }
}
