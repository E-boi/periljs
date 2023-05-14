export enum Opcodes {
  dispatch = 0,
  heartbeat = 1,
  identify = 2,
  presenceUpdate = 3,
  voiceStateUpdate = 4,
  resume = 6,
  reconnect = 7,
  requestGuildMembers = 8,
  invalidSession = 9,
  hello = 10,
  heartbeatACK = 11,
}
