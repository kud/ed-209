export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const CHANNEL_COMMAND_RE = nick => new RegExp(`^${nick}(?::|,) +(.*)`)
const PRIVATE_COMMAND_RE = nick => new RegExp(`^(?:${nick}(?::|,) +)?(.*)`)

export function findCommand(envelope, nick) {
  const {context, message} = envelope

  switch (context) {
    case 'channel':
      return message.match(CHANNEL_COMMAND_RE(nick))
    case 'pm':
      return message.match(PRIVATE_COMMAND_RE(nick))
  }
}

export function removeCommand(command, envelope, nick) {
  const {context, message} = envelope

  let rawCommand

  switch (context) {
    case 'channel':
      rawCommand = message.match(CHANNEL_COMMAND_RE(nick))[1]
      break
    case 'pm':
      rawCommand = message.match(PRIVATE_COMMAND_RE(nick))[1]
      break
    default:
      rawCommand = message
  }

  return rawCommand.replace(new RegExp(`^${command} *(.*)`), '$1')
}
