import { RawTextInput } from "../rawTypes";
import { ComponentTypes, TextInputStyles } from "../enums";

export interface TextInputFields {
  customId: string;
  style?: TextInputStyles;
  label: string;
  /**
   * [min, max]
   */
  length?: [number?, number?];
  required?: boolean;
  value?: string;
  placeholder?: string;
}

/**
 * @category Components
 */
export class TextInput implements TextInputFields {
  customId: string;
  /**
   * Style of the Text Input
   * @default TextInputStyles.SHORT
   */
  style: TextInputStyles;
  label: string;
  /**
   * [min, max]
   */
  length?: [number?, number?];
  required?: boolean;
  value?: string;
  placeholder?: string;

  constructor(component: TextInputFields) {
    this.customId = component.customId;
    this.style = component.style ?? TextInputStyles.SHORT;
    this.label = component.label;
    this.length = component.length;
    this.required = component.required;
    this.value = component.value;
    this.placeholder = component.placeholder;
  }

  static from(component: RawTextInput) {
    return new TextInput({
      customId: component.custom_id,
      label: component.label,
      length: [component.min_length, component.max_length],
      placeholder: component.placeholder,
      required: component.required,
      style: component.style,
      value: component.value,
    });
  }

  toJson(): RawTextInput {
    return {
      custom_id: this.customId,
      label: this.label,
      style: this.style,
      type: ComponentTypes.TextInput,
      max_length: this.length?.[1],
      min_length: this.length?.[0],
      placeholder: this.placeholder,
      required: this.required,
      value: this.value,
    };
  }
}
