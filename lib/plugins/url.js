import fetch from "node-fetch"
import cheerio from "cheerio"

const URL_RE = /https?:\/\/(\S+)/g

function createUrlFilter(blacklist) {
  function isBlacklisted(url) {
    return blacklist.some(p => p.test(url))
  }

  return function urlFilter(bot, envelope) {
    const {message} = envelope
    const matches = message.match(URL_RE) || []

    for (const url of matches) {
      if (isBlacklisted(url))  {
        bot.info(`skip blacklisted ${url}`)
        continue
      }

      if (url !== null) {
        fetch(url)
          .then(r => r.text())
          .then(body => cheerio.load(body))
          .then(doc => doc("title").text())
          .then(title => title.length && bot.reply(envelope, `↳ ${title}`))
      }
    }
  }
}

/**
 * The url plugin plugins automatically fetches website titles and displays
 * them in the channel.
 *
 * ## Requirements and setup
 *
 * - `npm install node-fetch cheerio`
 *
 * ## Configuration options
 *
 * - `blacklist`: a list of URL patterns to exclude from expansion
 */
export default function register(bot, config) {
  const blacklist = (config.blacklist || []).map(p => new RegExp(p))

  bot.addFilter(createUrlFilter(blacklist), ['channel'])
}

