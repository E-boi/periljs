import { Emoji } from "../emoji";
import { RawSelectOption } from "../rawTypes";

export interface SelectOptionFields {
  label: string;
  value: string;
  description?: string;
  emoji?: Emoji;
  default?: boolean;
}

export class SelectOption implements SelectOptionFields {
  label: string;
  value: string;
  description?: string;
  emoji?: Emoji;
  default?: boolean;

  constructor(option: SelectOptionFields) {
    this.label = option.label;
    this.value = option.value;
    this.description = option.value;
    this.emoji = option.emoji;
    this.default = option.default;
  }

  static from(option: RawSelectOption) {
    return new SelectOption({
      label: option.label,
      value: option.value,
      default: option.default,
      description: option.description,
      emoji: option.emoji && new Emoji(option.emoji),
    });
  }

  toJson(): RawSelectOption {
    return {
      label: this.label,
      value: this.value,
      default: this.default,
      description: this.description,
      emoji: this.emoji?.toJson(),
    };
  }
}
