import {removeCommand} from '../utils'

const USAGE = 'alert [--subscribe|--unsubscribe|message] - Broadcast a message to all subscribed users'

function alert(bot, envelope, ...args) {
  const memory = bot.memory.namespace('alert')
  const users = bot.client.chans[envelope.to].users
  const usersToNotify = []

  switch (args[0]) {
  case '--help':
    return bot.reply(envelope, USAGE)
  case '--subscribe':
    return subscribe(bot, envelope)
  case '--unsubscribe':
    return unsubscribe(bot, envelope)
  }

  for (const user in users) {
    if (user === 'ChanServ') continue
    if (user === envelope.from) continue
    if (user === bot.client.nick) continue
    if (memory.get(user) === false) continue

    usersToNotify.push(user)
  }

  const rawMessage = removeCommand('alert', envelope, bot.client.nick)
  const message = rawMessage.length ? rawMessage : 'wake up morons!'

  bot.reply(envelope, usersToNotify.join(' '))
  bot.reply(envelope, message)
}

function subscribe(bot, envelope) {
  const memory = bot.memory.namespace('alert')

  memory.set(envelope.from, true)
  memory.commit()

  bot.reply(envelope, `${envelope.from}: welcome back!`)
}

function unsubscribe(bot, envelope) {
  const memory = bot.memory.namespace('alert')

  memory.set(envelope.from, false)
  memory.commit()

  bot.reply(envelope, `${envelope.from}: sorry to see you go :(`)
}

/**
 * This plugin allows to notify all users of a channel with a given message.
 *
 * ## Requirements and setup
 *
 * - {@link memory} plugin
 *
 * ## Provided commands
 *
 * - `alert [--subscribe|--unsubscribe|message]`: Broadcast a message to all
 *   subscribed users
 */
export default function register(bot) {
  if (!bot.memory) {
    bot.error('[alert] This plugin requires the memory plugin')
    bot.error('        Please load it before loading this one')
    return false
  }

  bot.addCommand('alert', alert, ['channel'])
}
