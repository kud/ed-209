const USAGE = 'forkyou - Echoes the bot repository URL'

export default function register(bot, config) {
  const repoURL = config.repoURL || 'https://github.com/kud/ed-209'

  bot.addCommand('forkyou', ({client, to}, ...args) => {
    if (args[0] === '--help') {
      return client.say(to, USAGE)
    }

    client.say(to, `Please, please, please ${repoURL}`)
  })
}
