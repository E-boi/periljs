import { Emoji } from './Emoji';
import {
  ButtonStyles,
  ComponentTypes,
  RawButtonComponent,
  RawMessageComponent,
  RawSelectMenuComponent,
  RawSelectOption,
  RawTextInputComponent,
  TextInputStyles,
} from './RawTypes';

/**
 * @category Components
 */
export class Components {
  private components: (
    | ButtonComponent
    | TextInputComponent
    | SelectMenuComponent
  )[] = [];

  constructor(
    ...components:
      | (ButtonComponent | SelectMenuComponent | TextInputComponent)[]
      | ComponentOptions[]
  ) {
    this.add(...components);
  }

  add(
    ...components:
      | (
          | ComponentOptions
          | ButtonComponent
          | SelectMenuComponent
          | TextInputComponent
        )[]
  ): this {
    components.forEach(component => {
      if (
        component instanceof ButtonComponent ||
        component instanceof SelectMenuComponent ||
        component instanceof TextInputComponent
      )
        return this.components.push(component);
      switch (component.type) {
        case 'Button':
          this.components.push(new ButtonComponent(component));
          break;

        case 'SelectMenu':
          this.components.push(new SelectMenuComponent(component));
          break;

        case 'TextInput':
          this.components.push(new TextInputComponent(component));
          break;
      }
    });

    return this;
  }

  has(customId: string): boolean {
    return this.components.some(component => component.customId === customId);
  }

  get(
    customId: string
  ): SelectMenuComponent | TextInputComponent | ButtonComponent | undefined {
    return this.components.find(component => component.customId === customId);
  }

  getAll(): (SelectMenuComponent | TextInputComponent | ButtonComponent)[] {
    return this.components;
  }

  static from(
    ...components:
      | (RawButtonComponent | RawSelectMenuComponent | RawTextInputComponent)[]
  ) {
    const Component = new Components();
    components.forEach(component => {
      switch (component.type) {
        case ComponentTypes.Button:
          Component.add(ButtonComponent.from(component));
          break;

        case ComponentTypes.SelectMenu:
          Component.add(SelectMenuComponent.from(component));
          break;

        case ComponentTypes.TextInput:
          Component.add(TextInputComponent.from(component));
          break;
      }
    });
    return Component;
  }

  toJSON(): RawMessageComponent[] {
    // console.log([
    //   {
    //     type: ComponentTypes.ActionRow,
    //     components: this.components.map(component => component.toJSON()),
    //   },
    // ][0].components);
    return [
      {
        type: ComponentTypes.ActionRow,
        components: this.components.map(component => component.toJSON()),
      },
    ];
  }
}

/**
 * @category Components
 */
export class ButtonComponent {
  type: 'Button' = 'Button';
  style: keyof typeof ButtonStyles;
  customId: string;
  label: string;
  emoji?: Emoji;
  url?: string;
  disabled?: boolean;

  constructor(component: {
    style: keyof typeof ButtonStyles;
    customId: string;
    label: string;
    emoji?: Emoji;
    url?: string;
    disabled?: boolean;
  }) {
    this.style = component.style;
    this.customId = component.customId;
    this.label = component.label;
    this.emoji = component.emoji && new Emoji(component.emoji);
    this.url = component.url;
    this.disabled = component.disabled;
  }

  setStyle(style: keyof typeof ButtonStyles): this {
    this.style = style;
    return this;
  }

  setUrl(url: string): this {
    this.url = url;
    return this;
  }

  setId(id: string): this {
    this.customId = id;
    return this;
  }

  setEmoji(emoji: { id?: string; name: string; animated?: boolean }) {
    this.emoji = new Emoji(emoji);
    return this;
  }

  setLabel(label: string): this {
    this.label = label;
    return this;
  }

  setDisabled(disabled: boolean): this {
    this.disabled = disabled;
    return this;
  }

  /**
   * Creates a Button component from a Raw Discord component
   * @param {RawButtonComponent} component Discord Component
   * @returns {ButtonComponent} Button
   */
  static from(component: RawButtonComponent): ButtonComponent {
    return new ButtonComponent({
      style: ButtonStyles[component.style] as keyof typeof ButtonStyles,
      customId: component.custom_id,
      label: component.label,
      emoji: component.emoji && new Emoji(component.emoji),
      url: component.url,
      disabled: component.disabled,
    });
  }

  toJSON(): RawButtonComponent {
    return {
      custom_id: this.customId,
      style: ButtonStyles[this.style],
      label: this.label,
      type: ComponentTypes.Button,
      disabled: this.disabled,
      emoji: this.emoji?.toJSON(),
    };
  }
}

/**
 * @category Components
 */
export class TextInputComponent {
  type: 'TextInput' = 'TextInput';
  customId: string;
  style: keyof typeof TextInputStyles;
  label: string;
  length: [number, number];
  required?: boolean;
  value?: string;
  placeholder?: string;

  constructor(component: {
    customId: string;
    style: keyof typeof TextInputStyles;
    label: string;
    length?: [number, number];
    required?: boolean;
    value?: string;
    placeholder?: string;
  }) {
    this.customId = component.customId;
    this.style = component.style;
    this.label = component.label;
    this.length = [component.length?.[0] ?? 0, component.length?.[1] ?? 4000];
    this.required = component.required;
    this.value = component.value;
    this.placeholder = component.placeholder;
  }

  setId(id: string): this {
    this.customId = id;
    return this;
  }

  setStyle(style: keyof typeof TextInputStyles): this {
    this.style = style;
    return this;
  }

  setLength(minLength = 0, maxLength = 4000): this {
    this.length = [minLength, maxLength];
    return this;
  }

  setRequired(required: boolean): this {
    this.required = required;
    return this;
  }

  setValue(value: string): this {
    this.value = value;
    return this;
  }

  setPlaceholder(placeholder: string): this {
    this.placeholder = placeholder;
    return this;
  }

  /**
   * Creates a TextInput component from a Raw Discord component
   * @param {RawTextInputComponent} component Discord Component
   * @returns {TextInputComponent} TextInput
   */
  static from(component: RawTextInputComponent) {
    const TextInput = new TextInputComponent({
      customId: component.custom_id,
      label: component.label,
      style: TextInputStyles[component.style] as keyof typeof TextInputStyles,
      length: [component.min_length ?? 0, component.max_length ?? 4000],
      placeholder: component.placeholder,
      required: component.required,
      value: component.value,
    });
    return TextInput;
  }

  toJSON(): RawTextInputComponent {
    return {
      custom_id: this.customId,
      label: this.label,
      style: TextInputStyles[this.style],
      type: ComponentTypes.TextInput,
      min_length: this.length[0],
      max_length: this.length[1],
      placeholder: this.placeholder,
      required: this.required,
      value: this.value,
    };
  }
}

/**
 * @category Components
 */
export class SelectMenuComponent {
  type: 'SelectMenu' = 'SelectMenu';
  customId: string;
  options: SelectOption[];
  placeholder?: string;
  values: [number, number];
  disabled?: boolean;

  constructor(component: {
    customId: string;
    options: SelectOption[];
    placeholder?: string;
    values?: [number, number];
    disabled?: boolean;
  }) {
    this.customId = component.customId;
    this.options = component.options;
    this.placeholder = component.placeholder;
    this.values = [component.values?.[0] ?? 1, component.values?.[1] ?? 1];
    this.disabled = component.disabled;
  }

  setId(id: string): this {
    this.customId = id;
    return this;
  }

  setOptions(options: SelectOption[]): this {
    this.options = options;
    return this;
  }

  addOptions(...options: SelectOption[]): this {
    this.options.push(...options);
    return this;
  }

  setValues(minValue = 1, maxValue = 1): this {
    this.values = [minValue, maxValue];
    return this;
  }

  setPlaceholder(placeholder: string): this {
    this.placeholder = placeholder;
    return this;
  }

  setDisabled(disabled: boolean): this {
    this.disabled = disabled;
    return this;
  }

  /**
   * Creates a SelectMenu component from a Raw Discord component
   * @param {RawSelectMenuComponent} component Discord Component
   * @returns {SelectMenuComponent} Button
   */
  static from(component: RawSelectMenuComponent): SelectMenuComponent {
    return new SelectMenuComponent({
      customId: component.custom_id,
      options: component.options.map(option => ({
        label: option.label,
        value: option.value,
        default: option.default,
        description: option.description,
        emoji: option.emoji && new Emoji(option.emoji),
      })),
      disabled: component.disabled,
      placeholder: component.placeholder,
      values: [component.min_values ?? 1, component.max_values ?? 1],
    });
  }

  toJSON(): RawSelectMenuComponent {
    return {
      custom_id: this.customId,
      options: this.options.map(option => ({
        label: option.label,
        value: option.value,
        default: option.default,
        description: option.description,
        emoji: option.emoji?.toJSON(),
      })),
      type: ComponentTypes.SelectMenu,
      disabled: this.disabled,
      min_values: this.values[0],
      max_values: this.values[1],
      placeholder: this.placeholder,
    };
  }
}

/**
 * @category Components
 */
export type SelectOption = Omit<RawSelectOption, 'emoji'> & { emoji?: Emoji };

/**
 * @category Components
 */
export interface SelectMenuOptions {
  type: 'SelectMenu';
  customId: string;
  options: SelectOption[];
  placeholder?: string;
  values?: [number, number];
  disabled?: boolean;
}

/**
 * @category Components
 */
export interface TextInputOptions {
  type: 'TextInput';
  customId: string;
  style: keyof typeof TextInputStyles;
  label: string;
  length?: [number, number];
  required?: boolean;
  value?: string;
  placeholder?: string;
}

/**
 * @category Components
 */
export interface ButtonOptions {
  type: 'Button';
  style: keyof typeof ButtonStyles;
  customId: string;
  label: string;
  emoji?: Emoji;
  url?: string;
  disabled?: boolean;
}

/**
 * @category Components
 */
export type ComponentOptions =
  | SelectMenuOptions
  | TextInputOptions
  | ButtonOptions;
