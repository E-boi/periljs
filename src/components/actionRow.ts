import { RawActionRow, RawSelectMenu } from "../rawTypes";
import { ComponentTypes } from "../enums";
import { Button } from "./button";
import { ChannelsSelectMenu } from "./channelsSelectMenu";
import { MentionableSelectMenu } from "./mentionableSelectMenu";
import { RoleSelectMenu } from "./roleSelectMenu";
import { StringSelectMenu } from "./stringSelectMenu";
import { TextInput } from "./textInput";
import { UserSelectMenu } from "./userSelectMenu";

export type Component =
  | TextInput
  | RoleSelectMenu
  | UserSelectMenu
  | StringSelectMenu
  | ChannelsSelectMenu
  | MentionableSelectMenu;

/**
 * @category Components
 */
export class ActionRow {
  components: Map<string, Component> = new Map();

  constructor(...components: Component[]) {
    this.add(...components);
  }

  static from(row: RawActionRow) {
    return new ActionRow(
      ...(row.components
        .map((component) => {
          switch (component.type) {
            case ComponentTypes.Button:
              return Button.from(component);
            case ComponentTypes.TextInput:
              return TextInput.from(component);
            case ComponentTypes.StringSelect:
              return StringSelectMenu.from(component as RawSelectMenu);
            case ComponentTypes.UserSelect:
              return UserSelectMenu.from(component);
            case ComponentTypes.RoleSelect:
              return RoleSelectMenu.from(component);
            case ComponentTypes.MentionableSelect:
              return MentionableSelectMenu.from(component);
            case ComponentTypes.ChannelSelect:
              return ChannelsSelectMenu.from(component);
            default:
              return null;
          }
        })
        .filter(Boolean) as Component[])
    );
  }

  add(...components: Component[]) {
    components.forEach((c) => this.components.set(c.customId, c));
  }

  has(customId: string) {
    return this.components.has(customId);
  }

  get(customId: string) {
    return this.components.get(customId);
  }

  delete(customId: string) {
    return this.components.delete(customId);
  }

  toJson(): RawActionRow {
    return {
      type: ComponentTypes.ActionRow,
      components: [...this.components.values()].map((c) => c.toJson()),
    };
  }
}
