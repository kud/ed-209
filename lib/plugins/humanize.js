import {getRandomInt} from '../utils'

export default function register(bot, config) {
  if (config.metal) {
    bot.addFilter(/\bmetal\b|\bhardcore\b/, ({client, to}) => {
      setTimeout(() => {
        client.say(to, '\\m/')
      }, getRandomInt(0, 5000))
    })
  }
}
