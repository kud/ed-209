function echoFilter(bot, envelope) {
  bot.reply(envelope, envelope.message)
}

export default function register(bot) {
  bot.addFilter(echoFilter)
}
