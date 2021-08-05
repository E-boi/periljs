# What is a MemberShard?
**MemberShard is not a confirmed feature, nor a completed concept.**

A `MemberShard` is a partial member object built up of the pure essential data of a member.

## What's the difference between a MemberShard and a GuildMember?

well, to explain that easily you just need to look at the composition of a `MemberShard` and a `GuildMember`.

```
MemberShard:
{
    name: "jai",
    discriminator: "0001",
    id: "98133204636028928",
    guild_id: "538759280057122817",
    channel_id: "754981916402515969",

}