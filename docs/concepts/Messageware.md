# What is Messageware?

Messageware is a type of integration that allows you to customize how messages are sent and received in your application.

Messagewares can be used to:

- Setup an automod with ease.
- Add custom logic to your application.
- Add custom argument processing algorithms.
- Add custom interaction logic.


## How do I use Messageware?

once you have initialized your client (BEFORE you login), use the following function to add a messageware:

`Client.requestMessageware(messageware)`

This takes in a messageware object, which contains the following:

```ts
{
    beforeSend: function(message: Message): Message,
    beforeHandle: function(message: Message): Message | boolean,
    priority: number,
}
```
`#beforeSend` is called before the message is sent, it recieves the message
and must return a message object.

`#beforeHandle` is called before a received message is handled, it takes the message object and has to return either a message object or a boolean signifying 
that the message has been handled.

`.priority` is used to determine the order in which messagewares are called.
