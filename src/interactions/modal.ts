import { Client } from "../client";
import { ActionRow, TextInput } from "../components";
import { RawInteraction, RawInteractionModalSubmitData } from "../rawTypes";
import { ReplyableInteraction } from "./replyable";

interface ModalInteractionFields {
  customId: string;
  components: ActionRow[];
}

export default class ModalInteraction extends ReplyableInteraction {
  modal: ModalInteractionFields;

  constructor(interaction: RawInteraction, client: Client) {
    super(interaction, client);

    this.modal = {
      customId: (interaction.data as RawInteractionModalSubmitData).custom_id,
      components: (interaction.data as RawInteractionModalSubmitData).components.map((c) =>
        ActionRow.from(c)
      ),
    };
  }

  getValue(customId: string) {
    for (const row of this.modal.components) {
      if (row.has(customId)) return (row.get(customId) as TextInput).value;
    }

    return undefined;
  }
}
