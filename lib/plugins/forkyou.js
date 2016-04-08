const USAGE = 'forkyou - Echoes the bot repository URL'

export default function register(bot, config) {
  const repoURL = config.repoURL || 'https://github.com/kud/ed-209'

  bot.addCommand('forkyou', ({client, to}) => {
    client.say(to, `Please, please, please ${repoURL}`)
  } )
}
