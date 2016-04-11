export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function findCommand(envelope, nick) {
  const {context, message} = envelope

  switch (context) {
    case 'channel': {
      const commandRE = new RegExp(`^${bot.config.nick}(?::|,) (.*)`)
      return message.match(commandRE)
    }
    case 'pm': {
      const commandRE = new RegExp(`^(?:${bot.config.nick}(?::|,) )?(.*)`)
      return message.match(commandRE)
    }
  }
}
