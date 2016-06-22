import {getRandomInt} from '../utils'

function createFilter(pattern, reaction) {
  return function(bot, envelope) {
    const {message} = envelope

    if (message.match(new RegExp(`\\b${pattern}\\b`)) === null) {
      return
    }

    setTimeout(() => {
      if (typeof reaction === 'object') {
        bot.reply(envelope, reaction[getRandomInt(0, reaction.length - 1)])
      } else {
        bot.reply(envelope, reaction)
      }
    }, 1000 * getRandomInt(1, 5))
  }
}

export default function register(bot, config) {
  Object.entries(config).forEach(([pattern, reaction]) => {
    bot.addFilter(createFilter(pattern, reaction))
    bot.info(`[reactions] React to ${pattern} with ${reaction}`)
  })
}
