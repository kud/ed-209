import shellwords from "shellwords"

export default function register(bot) {
  process.stdin.resume()
  process.stdin.setEncoding('utf8')

  bot.info(`[stdin_reader] Reading data from stdin`)

  process.stdin.on('data', chunk => {
    if (chunk.match(/^\//) !== null) {
      const args = shellwords.split(chunk.slice(1))
      return bot.client.send.apply(bot.client, args)
    }

    if (chunk.match(/^#/) !== null) {
      const chanLength = chunk.indexOf(" ")
      const channel = chunk.slice(0, chanLength)
      const message = chunk.slice(chanLength + 1)
      return bot.say(channel, message)
    }

    for (const channel of bot.config.channels) {
      bot.say(channel, chunk)
    }
  })
}
