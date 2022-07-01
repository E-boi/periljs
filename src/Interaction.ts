import { PartailChannel, MessageOptions } from './Channel';
import { CommandDataOption } from './Command';
import {
  ButtonComponent,
  ButtonOptions,
  Components,
  SelectMenuComponent,
  SelectMenuOptions,
  TextInputComponent,
  TextInputOptions,
} from './Component';
import { Embed, EmbedOptions } from './Embed';
import HTTPS from './HTTPS';
import { Attachment, Message } from './Message';
import {
  CommandOptionType,
  Commandtype,
  ComponentTypes,
  InteractionCallbackType,
  InteractionType,
  MessageFlags,
  RawAllowedMentions,
  RawInteraction,
  RawInteractionResolvedData,
  RawInterationCommandDataOption,
  RawMessageInteraction,
} from './RawTypes';
import { Role } from './Role';
import { GuildMember, PartialGuildMember, User } from './User';

/**
 * Base Interaction class
 * @category Interactions
 */

export class BaseInteraction {
  /** Id of the interaction */
  id: string;
  /** Application id */
  applicationId: string;
  /** Type of interaction */
  type: keyof typeof InteractionType;
  /** Data of the interaction */
  protected data?: InteractionData;
  /** The guild id of where the interaction was used from */
  guildId?: string;
  /** The channel id of where the interaction was used from */
  channelId?: string;
  /** If the interaction was used in a guild */
  member?: GuildMember;
  /** If the interaction was used in a DM */
  user?: User;
  /** The token of the interaction used for replying */
  token: string;
  /** Always 1 because discord */
  version: number;
  /** For components, the message they were attached to */
  message?: Message;
  /** The selected language used by the user */
  locale?: string;
  /** The guild's preferred language, if used in a guild */
  guildLocale?: string;

  constructor(private interaction: RawInteraction, public request: HTTPS) {
    this.id = interaction.id;
    this.applicationId = interaction.application_id;
    this.type = InteractionType[
      interaction.type
    ] as keyof typeof InteractionType;
    this.token = interaction.token;
    this.version = interaction.version;
    this.guildId = interaction.guild_id;
    this.channelId = interaction.channel_id;
    this.member = interaction.member && new GuildMember(interaction.member);
    this.user = interaction.user && new User(interaction.user);
    this.message =
      interaction.message && new Message(interaction.message, request);
    this.locale = interaction.locale;
    this.guildLocale = interaction.guild_locale;

    const resolved = interaction.data?.resolved;
    this.data = interaction.data && {
      id: interaction.data.id,
      name: interaction.data.name,
      type: Commandtype[interaction.data.type] as keyof typeof Commandtype,
      guildId: interaction.data.guild_id,
      options:
        interaction.data.options &&
        this.transformOptions(interaction.data.options),
      resolved: resolved,
      targetId: interaction.data.target_id,
      components: interaction.data.components && new Components(),
      customId: interaction.data.custom_id,
      componentType:
        interaction.data.component_type &&
        (ComponentTypes[
          interaction.data.component_type
        ] as keyof typeof ComponentTypes),
      values: interaction.data.values,
    };

    interaction.data?.components?.forEach(component =>
      this.data?.components?.add(
        ...Components.from(...component.components).getAll()
      )
    );
  }

  /** If the interaction is a slash command */
  isSlash(): this is SlashInteraction {
    return this.data?.type === 'CHAT_INPUT';
  }

  /** If the interaction is a user command */
  isUser(): this is UserInteraction {
    return this.data?.type === 'USER';
  }

  /** If the interaction is a message command */
  isMessage(): this is MessageInteraction {
    return this.data?.type === 'MESSAGE';
  }

  /** If the interaction is a modal submit */
  isModal(): this is ModalInteraction {
    return this.type === 'MODAL_SUBMIT';
  }

  /** If the interaction is replyable */
  isReplyable(): this is ReplyableInteraction {
    return (
      this.isMessage() || this.isModal() || this.isUser() || this.isSlash()
    );
  }

  /** If the interaction can be replyed with a modal */
  isMoalReplyable(): this is ModalReplyable {
    return this.isMessage() || this.isUser() || this.isSlash();
  }

  /** if the interaction comes from a component */
  isComponent(): this is MessageComponentInteraction {
    return this.type === 'MESSAGE_COMPONENT';
  }

  static messageInteraction(
    interaction: RawMessageInteraction
  ): InMessageInteraction {
    return {
      id: interaction.id,
      name: interaction.name,
      type: InteractionType[interaction.type] as keyof typeof InteractionType,
      user: new User(interaction.user),
      member: interaction.member && new PartialGuildMember(interaction.member),
    };
  }

  private transformOptions(
    options: RawInterationCommandDataOption[]
  ): CommandDataOption[] {
    return options.map(option => ({
      type: CommandOptionType[option.type] as keyof typeof CommandOptionType,
      options: option.options && this.transformOptions(option.options),
      name: option.name,
      focused: option.focused,
      value: option.value,
    }));
  }
}

/**
 * @category Interactions
 */
export class ReplyableInteraction extends BaseInteraction {
  /** Reply to an interaction
   * @param {InteractionMessageCallback | string} reply options for the reply
   */
  async reply(reply: InteractionMessageCallback | string) {
    if (typeof reply === 'string') reply = { content: reply };

    await this.request.createInteractionResponse(this.id, this.token, {
      type: InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: Message.create({
        ...reply,
        flags: (reply.ephemeral && ['EPHEMERAL']) || undefined,
      }),
    });
  }

  /**
   * if unable to reply within 3 seconds use this to show a loading state
   *
   * @param {Boolean} ephemeral Whether if the reply is ephemeral
   *
   * @example
   * ```js
   * // defer reply to an interaction and edit the reply later
   * interaction.deferReply()
   * await functionThatTakesLongerThen3Seconds()
   * interaction.editReply('done!')
   * ```
   */
  async deferReply(ephemeral?: boolean) {
    await this.request.createInteractionResponse(this.id, this.token, {
      type: InteractionCallbackType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        flags: ephemeral ? MessageFlags.EPHEMERAL : undefined,
      },
    });
  }

  async editReply(message: MessageOptions | string) {
    await this.request.editOriginalInteractionResponse(
      this.applicationId,
      this.token,
      Message.create(message)
    );
  }

  async followup(message: (MessageOptions & { ephemeral?: boolean }) | string) {
    if (typeof message === 'string') message = { content: message };

    await this.request.createFollowupMessage(
      this.applicationId,
      this.token,
      Message.create({
        ...message,
        flags: (message.ephemeral && ['EPHEMERAL']) || undefined,
      })
    );
  }

  async getOriginalResponse(): Promise<Message> {
    const data = await this.request.getOriginalInteractionResponse(
      this.applicationId,
      this.token
    );

    return new Message(data, this.request);
  }
}

/**
 * @category Interactions
 */
export class ModalReplyable extends ReplyableInteraction {
  async modal(modal: InteractionModalCallback) {
    const components = Array.isArray(modal.components)
      ? new Components(...modal.components).toJSON()
      : modal.components.toJSON();

    await this.request.createInteractionResponse(this.id, this.token, {
      type: InteractionCallbackType.MODAL,
      data: {
        custom_id: modal.customId,
        title: modal.title,
        components,
      },
    });
  }
}

export class MessageComponentInteraction extends ModalReplyable {
  async deferUpdate() {
    await this.request.createInteractionResponse(this.id, this.token, {
      type: InteractionCallbackType.DEFERRED_UPDATE_MESSAGE,
    });
  }
}

/**
 * @category Interactions
 */
export class SlashInteraction extends ModalReplyable {
  command: InteractionSlashData;
  constructor(interaction: RawInteraction, request: HTTPS) {
    super(interaction, request);
    this.command = this.data as InteractionSlashData;
  }

  getOption(
    name: string,
    type?: keyof typeof CommandOptionType,
    options?: CommandDataOption[]
  ): CommandDataOption | undefined {
    options = (options || this.command.options) as CommandDataOption[];
    for (let i = 0; i < options.length; i++) {
      if (options[i].type === type && options[i].name === name)
        return options[i];
      else if (options[i].name === name) return options[i];
      else if (options[i].options)
        return this.getOption(name, type, options[i].options);
    }
  }
}

/**
 * @category Interactions
 */
export class UserInteraction extends ModalReplyable {
  command: InteractionContextMenuData;
  constructor(interaction: RawInteraction, request: HTTPS) {
    super(interaction, request);
    this.command = this.data as InteractionContextMenuData;
  }

  get targetUser(): User | undefined {
    const rawUser = this.data?.resolved?.users?.[this.command.targetId];
    return rawUser && new User(rawUser);
  }
}

/**
 * @category Interactions
 */
export class MessageInteraction extends ModalReplyable {
  command: InteractionContextMenuData;
  constructor(interaction: RawInteraction, request: HTTPS) {
    super(interaction, request);
    this.command = this.data as InteractionContextMenuData;
  }

  /** The targeted message */
  get targetMessage(): Message | undefined {
    const rawMessage = this.data?.resolved?.messages?.[this.command.targetId];
    return rawMessage && new Message(rawMessage, this.request);
  }
}

/**
 * @category Interactions
 */
export class ModalInteraction extends ReplyableInteraction {
  modal: InteractionModalData;
  constructor(interaction: RawInteraction, request: HTTPS) {
    super(interaction, request);
    this.modal = this.data as InteractionModalData;
  }

  getField(
    customId: string
  ): TextInputComponent | SelectMenuComponent | ButtonComponent | undefined {
    return this.modal.components.get(customId);
  }

  getValue(customId: string): string | undefined {
    const field = this.getField(customId);
    if (field?.type === 'TextInput') return field.value;
  }
}

/**
 * @category Interactions
 */
export class ButtonInteraction extends MessageComponentInteraction {
  button: ButtonComponent;
  constructor(interaction: RawInteraction, request: HTTPS) {
    super(interaction, request);
    this.button = this.message?.components.get(
      this.data?.customId as string
    ) as ButtonComponent;
  }
}

export class SelectMenuInteraction extends MessageComponentInteraction {
  menu: SelectMenuComponent;
  values: string[];
  constructor(interaction: RawInteraction, request: HTTPS) {
    super(interaction, request);
    this.menu = this.message?.components.get(
      this.data?.customId as string
    ) as SelectMenuComponent;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.values = this.data!.values as string[];
  }
}

export interface InMessageInteraction {
  id: string;
  type: keyof typeof InteractionType;
  name: string;
  user: User;
  member?: PartialGuildMember;
}

export interface InteractionData {
  id: string;
  name: string;
  type: keyof typeof Commandtype;
  resolved?: RawInteractionResolvedData;
  options?: CommandDataOption[];
  guildId?: string;
  targetId?: string;
  components?: Components;
  componentType?: keyof typeof ComponentTypes;
  customId?: string;
  values?: string[];
}

export interface InteractionSlashData {
  id: string;
  name: string;
  type: keyof typeof Commandtype;
  guildId?: string;
  options?: CommandDataOption[];
}

export interface InteractionContextMenuData {
  id: string;
  name: string;
  type: keyof typeof Commandtype;
  guildId?: string;
  targetId: string;
}

export interface InteractionModalData {
  customId: string;
  components: Components;
}

export interface InteractionResolvedData {
  users?: Map<string, User>;
  messages?: Map<string, Message>;
  members?: Map<string, PartialGuildMember>;
  channels?: Map<string, PartailChannel>;
  roles?: Map<string, Role>;
  attachments?: Map<string, Attachment>;
}

export interface InteractionMessageCallback {
  tts?: boolean;
  content?: string;
  embeds?: Embed[] | EmbedOptions[];
  allowedMentions?: RawAllowedMentions;
  ephemeral?: boolean;
  components?: Components | (SelectMenuOptions | ButtonOptions)[];
}

export interface InteractionModalCallback {
  customId: string;
  title: string;
  components: Components | TextInputOptions[];
}
