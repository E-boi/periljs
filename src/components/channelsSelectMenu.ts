import { RawSelectMenu } from "../rawTypes";
import { ChannelTypes, ComponentTypes } from "../enums";
import { BaseSelectMenu, BaseSelectMenuFields } from "./baseSelectMenu";

export type ChannelsSelectMenuField = BaseSelectMenuFields & { channelTypes?: ChannelTypes[] };

/**
 * @category Components
 */
export class ChannelsSelectMenu extends BaseSelectMenu implements ChannelsSelectMenuField {
  channelTypes?: ChannelTypes[];

  constructor(menu: Omit<ChannelsSelectMenuField, "type">) {
    super({ ...menu, type: ComponentTypes.ChannelSelect });
    // this.options = menu.options;
    this.channelTypes = menu.channelTypes;
  }

  static from(menu: RawSelectMenu) {
    return new ChannelsSelectMenu({
      customId: menu.custom_id,
      channelTypes: menu.channel_types,
      disabled: menu.disabled,
      placeholder: menu.placeholder,
      values: [menu.min_values, menu.min_values],
    });
  }

  toJson(): RawSelectMenu {
    return {
      ...super.toJson(),
      channel_types: this.channelTypes,
    };
  }
}
