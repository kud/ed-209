const USAGE = 'list - Lists bot commands'

function list(bot, envelope, ...args) {
  if (args[0] === '--help') {
    return bot.reply(envelope, USAGE)
  }

  const commands = Object.keys(bot.commands)
  const commandList = `Commands: ${commands.join(' ∙ ')}`

  bot.reply(envelope, commandList)
}

export default function register(bot) {
  bot.addCommand('list', list)
}
