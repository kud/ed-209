const USAGE = 'list - Lists bot commands'

export default function register(bot) {
  bot.addCommand('list', ({client, to}, ...args) => {
    if (args[0] === '--help') {
      return client.say(to, USAGE)
    }

    const commands = Object.keys(bot.commands)
    const commandList = `Commands: ${commands.join(' ∙ ')}`

    client.say(to, commandList)
  })
}
