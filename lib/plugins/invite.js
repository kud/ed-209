/**
 * This plugin allows the bot to join channels it is invited on.
 *
 * ## Configuration options
 *
 * - `joinMessage`: A message that will be sent to the channel after joining.
 *   Defaults to "Hello there!".
 */
export default function register(bot, config) {
  const joinMessage = config.joinMessage || "Hello there!"

  bot.client.addListener('invite', (channel, from, message) => {
    bot.info(`[invite] Invited to ${channel} by ${from}`)
    bot.client.join(channel)
    bot.say(channel, joinMessage)
  })
}
