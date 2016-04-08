export default function register(bot) {
  bot.addFilter(envelope => {
    bot.reply(envelope, envelope.message)
  })
}
