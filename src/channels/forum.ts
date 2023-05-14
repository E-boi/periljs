import { RawDefaultReaction, RawForumTag } from "../rawTypes";

export class ForumTag {
  id: string;
  name: string;
  moderated: boolean;
  emojiId?: string;
  emojiName?: string;

  constructor(tag: RawForumTag) {
    this.id = tag.id;
    this.name = tag.name;
    this.moderated = tag.moderated;
    this.emojiId = tag.emoji_id;
    this.emojiName = tag.emoji_name;
  }

  toJson(): RawForumTag {
    return {
      id: this.id,
      name: this.name,
      moderated: this.moderated,
      emoji_id: this.emojiId,
      emoji_name: this.emojiName,
    };
  }
}

export class DefaultReaction {
  emojiId?: string;
  emojiName?: string;

  constructor(reaction: RawDefaultReaction) {
    this.emojiId = reaction.emoji_id;
    this.emojiName = reaction.emoij_name;
  }

  toJson(): RawDefaultReaction {
    return {
      emoij_name: this.emojiName,
      emoji_id: this.emojiId,
    };
  }
}
