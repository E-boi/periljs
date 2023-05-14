import { RawSelectMenu } from "../rawTypes";
import { ComponentTypes } from "../enums";

export interface BaseSelectMenuFields {
  type:
    | ComponentTypes.StringSelect
    | ComponentTypes.ChannelSelect
    | ComponentTypes.MentionableSelect
    | ComponentTypes.UserSelect
    | ComponentTypes.RoleSelect;
  customId: string;
  placeholder?: string;
  values?: [number?, number?];
  disabled?: boolean;
}

/**
 * @category Components
 */
export class BaseSelectMenu implements BaseSelectMenuFields {
  type:
    | ComponentTypes.StringSelect
    | ComponentTypes.ChannelSelect
    | ComponentTypes.MentionableSelect
    | ComponentTypes.UserSelect
    | ComponentTypes.RoleSelect;
  customId: string;
  placeholder?: string;
  values?: [number?, number?];
  disabled?: boolean;

  constructor(menu: BaseSelectMenuFields) {
    this.type = menu.type;
    this.customId = menu.customId;
    this.placeholder = menu.placeholder;
    this.values = menu.values;
    this.disabled = menu.disabled;
  }

  toJson(): RawSelectMenu {
    return {
      custom_id: this.customId,
      type: this.type,
      disabled: this.disabled,
      max_values: this.values?.[1],
      min_values: this.values?.[0],
      placeholder: this.placeholder,
    };
  }
}
