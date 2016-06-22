export default function register(bot, config) {
  const joinMessage = config.joinMessage || "Hello there!"

  bot.client.addListener('invite', (channel, from, message) => {
    bot.info(`[invite] Invited to ${channel} by ${from}`)
    bot.client.join(channel)
    bot.say(channel, joinMessage)
  })
}
