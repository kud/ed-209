import Twitter from "twitter"

const STATUS_RE = /https:\/\/twitter.com\/[^\/]+\/status\/([0-9]+)/

function createTwitterFilter(twitterClient) {
  return function twitterFilter(bot, envelope) {
    const {message} = envelope
    const match = message.match(STATUS_RE)

    if (match !== null) {
      const tweetId = match[1]

      twitterClient.get("statuses/show", {id: tweetId}, (error, tweet) => {
        if (error) {
          bot.error(`[twitter] ${JSON.stringify(error)}`)
          return
        }

        let reply = `↳ @${tweet.user.screen_name}: ${tweet.text}`

        function replaceUrl(entity) {
          reply = reply.replace(entity.url, entity.media_url_https)
        }

        // Expand URLs
        if (tweet.entities.urls && tweet.entities.urls.length) {
          tweet.entities.urls.forEach(url => {
            reply = reply.replace(url.url, url.expanded_url)
          })
        }

        // Expand media URLs
        if (tweet.entities.media && tweet.entities.media.length) {
          tweet.entities.media.forEach(media => {
            reply = reply.replace(media.url, media.media_url_https)
          })
        }

        bot.reply(envelope, reply)
      })
    }
  }
}

/**
 * The twitter plugins automatically expands twitter statuses URLs to the
 * contents of the tweet, also expanding media URLs in the tweet.
 *
 * ## Requirements and setup
 *
 * - `npm install twitter`
 *
 * You need to create an application at https://apps.twitter.com/ to
 * retrieve your credentials (see below).
 *
 * ## Configuration options
 *
 * - `consumerKey`
 * - `consumerSecret`
 * - `accessTokenKey`
 * - `accessTokenSecret`
 *
 * All these parameters can be found in the apps console (https://apps.twitter.com/)
 */
export default function register(bot, config) {
  const consumerKey = config.consumerKey
  const consumerSecret = config.consumerSecret
  const accessTokenKey = config.accessTokenKey
  const accessTokenSecret = config.accessTokenSecret

  const twitterClient = new Twitter({
    consumer_key: consumerKey,
    consumer_secret: consumerSecret,
    access_token_key: accessTokenKey,
    access_token_secret: accessTokenSecret
  })

  bot.addFilter(createTwitterFilter(twitterClient), ['channel'])
}

