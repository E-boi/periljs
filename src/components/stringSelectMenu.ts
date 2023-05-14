import { RawSelectMenu } from "../rawTypes";
import { ComponentTypes } from "../enums";
import { BaseSelectMenu, BaseSelectMenuFields } from "./baseSelectMenu";
import { SelectOption } from "./selectOption";

export type StringSelectMenuField = BaseSelectMenuFields & { options: SelectOption[] };

export class StringSelectMenu extends BaseSelectMenu implements StringSelectMenuField {
  options: SelectOption[];

  constructor(menu: Omit<StringSelectMenuField, "type">) {
    super({ ...menu, type: ComponentTypes.StringSelect });
    this.options = menu.options;
  }

  static from(menu: RawSelectMenu) {
    return new StringSelectMenu({
      customId: menu.custom_id,
      options: menu.options!.map((option) => SelectOption.from(option)),
      disabled: menu.disabled,
      placeholder: menu.placeholder,
      values: [menu.min_values, menu.min_values],
    });
  }

  toJson(): RawSelectMenu {
    return {
      ...super.toJson(),
      options: this.options.map((option) => option.toJson()),
    };
  }
}
