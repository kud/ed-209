import {getRandomInt} from '../utils'

function createFilter(pattern, reaction, maxDelay) {
  return function(bot, envelope) {
    const {message} = envelope
    const parsedPattern = pattern.replace('{@}', bot.client.nick)

    if (message.match(new RegExp(`\\b${parsedPattern}\\b`)) === null) {
      return
    }

    setTimeout(() => {
      let randomReaction = reaction

      if (typeof reaction === 'object') {
        randomReaction = reaction[getRandomInt(0, reaction.length - 1)]
      }

      bot.reply(envelope, randomReaction.replace('{@}', envelope.from))
    }, 1000 * getRandomInt(1, maxDelay))
  }
}

export default function register(bot, config) {
  const patterns = config.patterns || {}
  const maxDelay = config.maxDelay || 5

  Object.entries(patterns).forEach(([pattern, reaction]) => {
    bot.addFilter(createFilter(pattern, reaction, maxDelay))
    bot.info(`[reactions] React to ${pattern} with ${reaction}`)
  })
}
