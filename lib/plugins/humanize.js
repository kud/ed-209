import {getRandomInt} from '../utils'

export default function register(bot, config) {
  if (config.metal) {
    bot.addFilter(envelope => {
      const {message} = envelope
      if (message.match(/\bmetal\b|\bhardcore\b/) === null) {
        return
      }
      setTimeout(() => {
        bot.reply(envelope, '\\m/')
      }, getRandomInt(0, 5000))
    })
  }
}
