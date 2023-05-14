import { Client } from "../client";
import { SelectOption } from "../components";
import { RawInteraction, RawInteractionMessageComponentData } from "../rawTypes";
import BaseComponentInteraction, { ComponentFields } from "./baseComponent";

type SelectMenuFields = ComponentFields & { values: SelectOption[] };

export default class SelectMenuInteraction extends BaseComponentInteraction {
  override component: SelectMenuFields;

  constructor(interaction: RawInteraction, client: Client) {
    super(interaction, client);
    console.log(interaction.data);
    this.component = {
      componentType: (interaction.data as RawInteractionMessageComponentData).component_type,
      customId: (interaction.data as RawInteractionMessageComponentData).custom_id,
      values: (interaction.data as RawInteractionMessageComponentData).values!.map((v) =>
        SelectOption.from(typeof v === "string" ? { value: v, label: "" } : v)
      ),
    };
  }
}
