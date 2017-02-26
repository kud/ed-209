import http from 'http'

function parseResultsName(data)
{
  const today = new Date()
  let dateOfBirth
  let age
  let reply = ''
  data.names.forEach(function(name) {
    if (name.name) {
      reply += '↳ ' + name.name
    }

    if (name.actorActress) {
      reply += ' - ' + name.actorActress
    }

    if (name.dateOfBirth) {
      if (name.died) {
        reply += ' [' + name.dateOfBirth + ' - 💀 ' + name.died + ']'
      } else {
        dateOfBirth = new Date(name.dateOfBirth)
        age = today.getFullYear() - dateOfBirth.getFullYear()
        //reply += ' [' + name.dateOfBirth + ' - 💓 ' + age + ']'
        reply += ' [' + name.dateOfBirth + ' - 💓 ]'
      }
    }
  })
  return reply
}

function parseResultsTitle(data) {
  let i
  let reply = ''

  data.movies.forEach(function(movie) {
    if (movie.title) {
      reply += '↳ ' + movie.title
    }

    if (movie.year) {
      reply += ' (' + movie.year + ') '
    }

    if (movie.rating) {
      reply += movie.rating + '★ '
    }

    if (movie.actors) {
      reply += ' - '
      for (i = 0; i < 5 && movie.actors[i]; i++) {
        reply += movie.actors[i].actorName + ', '
      }
    }
  })
  return reply
}

function searchIMDB(pattern, apiKey) {
  return function imdb(bot, envelope) {
    const {message} = envelope
    const options = "format=json&language=en-us&token=" + apiKey
    const match = message.match(pattern)
    let url = "http://www.myapifilms.com/imdb/idIMDB?" + options
    let reply = ''

    if (match === null) {
      return
    }

    const idRequest = decodeURIComponent(match[2].replace(/_/g, ' '))
    if (match[1] === "name") {
      url += "&idName=" + idRequest + "&bornDied=1&uniqueName=0&actorActress=1"
    } else {
      url += "&idIMDB=" + idRequest + "&actors=1"
    }

    http.get(url, function(response) {
      let json = ''

      response.on("error", error => bot.error(util.inspect(error)))
      response.on("data", chunk => json+= chunk)

      response.on("end", function() {
        let res = JSON.parse(json.trim())

        if (res.error) {
          bot.error(res.error)
          return
        }

        if (match[1] === "name") {
          reply = parseResultsName(res.data)
        } else {
          reply = parseResultsTitle(res.data)
        }

        if (reply) {
          bot.reply(envelope, reply)
        }
      })
    })
  }
}

/**
 * The imdb plugins automatically expands imdb URLs with informations
 * from `myapifilms.com`
 *
 * ## Requirements and setup
 *
 * You need a tokken from http://www.myapifilms.com/token.do
 *
 * ## Configuration options
 *
 * - `myApiFilms`
 */
export default function register(bot, config) {
  const apiKey = config.myApiFilms
  const pattern = RegExp('https?://(?:www\\.)imdb\.com/(title|name)/([^/]+)/?')
  bot.addFilter(searchIMDB(pattern, apiKey))
}
