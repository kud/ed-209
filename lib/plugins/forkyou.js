const USAGE = 'forkyou - Echoes the bot repository URL'

export default function register(bot, config) {
  const repoURL = config.repoURL || 'https://github.com/kud/ed-209'

  bot.addCommand('forkyou', (envelope, ...args) => {
    if (args[0] === '--help') {
      return bot.reply(envelope, USAGE)
    }

    bot.reply(envelope, `Please, please, please ${repoURL}`)
  })
}
