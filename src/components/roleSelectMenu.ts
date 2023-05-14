import { RawSelectMenu } from "../rawTypes";
import { ComponentTypes } from "../enums";
import { BaseSelectMenu, BaseSelectMenuFields } from "./baseSelectMenu";

/**
 * @category Components
 */
export class RoleSelectMenu extends BaseSelectMenu {
  constructor(menu: Omit<BaseSelectMenuFields, "type">) {
    super({ ...menu, type: ComponentTypes.RoleSelect });
  }

  static from(menu: RawSelectMenu) {
    return new RoleSelectMenu({
      customId: menu.custom_id,
      disabled: menu.disabled,
      placeholder: menu.placeholder,
      values: [menu.min_values, menu.min_values],
    });
  }
}
