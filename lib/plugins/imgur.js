import https from 'https'
import irc from 'irc'
import * as colors from 'irc-colors'

function replyImage(data)
{
  let reply = '▪ '
  console.info(data)
  if (data.nsfw === true) {
    //reply += irc.colors.wrap("red", "(NSFW) ")
    reply += colors.red("red", "(NSFW) ")
  }
  reply += data.title ? data.title : "no title"
  if (data.views) {
    reply += ' - views: ' + data.views
  }
  return reply
}

function replyComment(data)
{
  let reply = '▪ '
  console.info(data)
  if (data.nsfw === true) {
    reply += irc.colors.wrap("red", "(NSFW) ")
  }
  reply += data.comment
  if (data.views) {
    reply += ' - points: ' + data.points
  }
  return reply
}

function searchImgur(clientId, pattern, endpoint) {
  return function imgur(bot, envelope) {
    const {message} = envelope
    const match = message.match(pattern)

    if (match === null) {
      return
    }

    const objectId = match[1]
    const options = {
      host: 'api.imgur.com',
      path: '/3/' + endpoint + '/' + objectId,
      port: "443",
      headers : {
        "Authorization" : "Client-ID " + clientId,
        "Content-Type" : "application/json"
      }
    }

    https.get(options, function(response) {
      let json = ''

      response.on("error", error => bot.error(util.inspect(error)))
      response.on("data", chunk => json+= chunk)

      response.on("end", function() {
        let res = JSON.parse(json.trim())
        if (res.success === true && res.status === 200) {
          if (endpoint === "comment") {
            bot.reply(envelope, replyComment(res.data))
          } else {
            bot.reply(envelope, replyImage(res.data))
          }
        }
      })
    })
  }
}

/**
 * The imgur plugins automatically expands imgur URLs with informations
 * from imgur (title, NSFW tag, ...).
 *
 * ## Requirements and setup
 *
 * You need to create an application at https://api.imgur.com/oauth2/addclient
 * to retrieve your credentials (see below).
 *
 * ## Configuration options
 *
 * - `clientId`:
 *
 * All these parameters can be found in the apps console
 * (https://imgur.com/account/settings/apps)
 */
export default function register(bot, config) {
  const clientId = config.clientId
  const patternImage = RegExp("https?://i\.imgur\.com/(\\w+)\.(?:jpg|png|gif|mp4)")
  const patternAlbum = RegExp("https?://(?:www\.)?imgur\.com/(?:gallery|a)/(\\w+)")
  const patternTopic = RegExp("https?://(?:www\.)?imgur\.com/(?:topic|t|r)/(?:\\w+)/(\\w+)")
  const patternCommentAlbum = RegExp("https?://(?:www\.)?imgur\.com/(?:gallery|a)/(?:\\w+)/comment/(\\w+)")
  const patternCommentTopic = RegExp("https?://(?:www\.)?imgur\.com/(?:topic|t|r)/(?:\\w+)/(?:\\w+)/comment/(\\w+)")
  bot.addFilter(searchImgur(clientId, patternAlbum, "album"))
  bot.addFilter(searchImgur(clientId, patternImage, "image"))
  bot.addFilter(searchImgur(clientId, patternTopic, "album"))
  bot.addFilter(searchImgur(clientId, patternCommentAlbum, "comment"))
  bot.addFilter(searchImgur(clientId, patternCommentTopic, "comment"))
}
