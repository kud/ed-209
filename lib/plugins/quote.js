import {getRandomInt} from '../utils'

const USAGE = 'quote [--add|--random|--count] - Save quotes and replay them later'

function quote(bot, envelope, ...args) {
  const db = bot.memory.namespace('quote')

  switch (args[0]) {
  case '--help':
    return bot.reply(envelope, USAGE)
  case '--add':
    const quoteId = addQuote(db, args)
    return bot.reply(envelope, `Saved quote ${quoteId}`)
  case '--count':
    return bot.reply(envelope, countQuotes(db))
  case '--random':
    return bot.reply(envelope, getRandomQuote(db))
  default:
    return bot.reply(envelope, getQuote(db, args[0]))
  }
}

function getQuote(db, quoteId) {
  const quoteIndex = parseInt(quoteId, 10)
  const quotes = db.get('quotes')
  const quote = quotes[quoteIndex]

  return quote ? quote : `No such quote ${quoteId}`
}

function getRandomQuote(db) {
  const quotes = db.get('quotes')
  const randomQuoteIndex = getRandomInt(0, quotes.length - 1)

  return quotes[randomQuoteIndex]
}

function addQuote(db, args) {
  const quotes = db.get('quotes')
  const quote = args.slice(1).join(" ")

  quotes.push(quote)
  db.commit()

  return quotes.length - 1
}

function countQuotes(db) {
  return db.get('quotes').length
}

/**
 * The quote plugins allow users to save quotes and replay them later.
 *
 * ## Requirements and setup
 *
 * - {@link memory} plugin
 *
 * ## Provided commands
 *
 * - `quote [--add|--random|--count]` - Save quotes and replay them later
 */
export default function register(bot) {
  if (!bot.memory) {
    bot.error('[quotes] This plugin requires the memory plugin')
    bot.error('         Please load it before loading this one')
    return false
  }

  const db = bot.memory.namespace('quote')

  if (!db.get('quotes')) {
    db.set('quotes', [])
    db.commit()
  }

  bot.addCommand('quote', quote)
}
