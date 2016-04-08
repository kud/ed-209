export default function register(bot, config, client) {
  process.stdin.resume()
  process.stdin.setEncoding('utf8')

  bot.info(`[stdin_reader] Reading data from stdin`)
  process.stdin.on('data', chunk => {
    if (chunk.match(/^\//) !== null) {
      const args = shellwords.split(chunk.slice(1))
      return client.send.apply(bot.client, args)
    }

    for (const channel of bot.config.channels) {
      client.say(channel, chunk)
    }
  })
}
