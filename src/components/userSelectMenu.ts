import { RawSelectMenu } from "../rawTypes";
import { ComponentTypes } from "../enums";
import { BaseSelectMenu, BaseSelectMenuFields } from "./baseSelectMenu";

/**
 * @category Components
 */
export class UserSelectMenu extends BaseSelectMenu {
  constructor(menu: Omit<BaseSelectMenuFields, "type">) {
    super({ ...menu, type: ComponentTypes.UserSelect });
  }

  static from(menu: RawSelectMenu) {
    return new UserSelectMenu({
      customId: menu.custom_id,
      disabled: menu.disabled,
      placeholder: menu.placeholder,
      values: [menu.min_values, menu.min_values],
    });
  }
}
