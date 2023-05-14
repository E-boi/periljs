import { Emoji } from "../emoji";
import { RawButton } from "../rawTypes";
import { ButtonStyle, ComponentTypes } from "../enums";

export interface ButtonFields {
  style?: ButtonStyle;
  label?: string;
  emoji?: Emoji;
  customId: string;
  url?: string;
  disabled?: boolean;
}

/**
 * @category Components
 */
export class Button implements ButtonFields {
  /**
   * @default ButtonStyle.Primary
   */
  style: ButtonStyle;
  label?: string;
  emoji?: Emoji;
  customId: string;
  url?: string;
  disabled?: boolean;

  constructor(button: ButtonFields) {
    this.style = button.style ?? ButtonStyle.PRIMARY;
    this.label = button.label;
    this.emoji = button.emoji;
    this.customId = button.customId;
    this.url = button.url;
    this.disabled = button.disabled;
  }

  static from(button: RawButton) {
    return new Button({
      customId: button.custom_id,
      style: button.style,
      disabled: button.disabled,
      emoji: button.emoji && Emoji.from(button.emoji),
      label: button.label,
      url: button.url,
    });
  }

  toJson(): RawButton {
    return {
      custom_id: this.customId,
      label: this.label,
      style: this.style,
      type: ComponentTypes.Button,
      disabled: this.disabled,
      emoji: this.emoji?.toJson(),
      url: this.url,
    };
  }
}
