const USAGE = 'caniuse [feature] - Get support information for a web feature'

function caniuse(bot, envelope, ...args) {
  if (args[0] === '--help') {
    return bot.reply(envelope, USAGE)
  }

  const reply = `http://caniuse.com/#search=${encodeURIComponent(args[0])}`

  bot.reply(envelope, reply)
}

/**
 * This plugin adds a `caniuse` command that can be used to query for support
 * information using the [caniuse](http://caniuse.com) database.
 *
 * ## Provided commands
 *
 * - `caniuse [feature]`: Get support information for a web feature
 */
export default function register(bot, config) {
  bot.addCommand('caniuse', caniuse)
}
