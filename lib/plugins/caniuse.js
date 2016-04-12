const USAGE = 'caniuse [property] - Get support information for a web feature'

function caniuse(bot, envelope, ...args) {
  if (args[0] === '--help') {
    return bot.reply(envelope, USAGE)
  }

  const reply = `http://caniuse.com/#search=${encodeURIComponent(args[0])}`

  bot.reply(envelope, reply)
}

export default function register(bot, config) {
  bot.addCommand('caniuse', caniuse)
}
