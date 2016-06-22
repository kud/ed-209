function leaveWith(leaveMessage) {
  return function leave(bot, envelope) {
    bot.reply(envelope, leaveMessage)
    bot.client.part(envelope.to)
  }
}

export default function register(bot, config) {
  const leaveMessage = config.joinMessage || "Bye there!"

  bot.addCommand('leave', leaveWith(leaveMessage), ['channel'])
}
