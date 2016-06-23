import {getRandomInt} from '../utils'

const USAGE = [
  'roll [options...] expr [expr...] - Rolls a set of dice',
  '  expr must be XdYM where X is the number of dice and Y the type of dice. ' +
    'M is a modifier like +1 or -4.',
  '  --max/--min: Indicate the maximum/minimum of each expression',
  '  --total: Compute the total of each expression',
]

function roll(bot, envelope, ...args) {
  if (args[0] === '--help') {
    USAGE.forEach(line => bot.reply(envelope, line))
    return
  }

  const options = {}
  const expressions = []

  // Parse arguments
  args.forEach(arg => {
    if (arg.startsWith('--')) {
      options[arg.slice(2)] = true
    } else {
      expressions.push(arg)
    }
  })

  if (!expressions.length) {
    bot.reply(envelope, 'Am I supposed to roll my own balls?')
    return
  }

  // Validate all expressions or die
  const validate = expressions.reduce((allValid, expression) => {
    const validExpression = checkExpression(expression)

    if (!validExpression) {
      bot.reply(envelope, `I can't even read that: ${expression}`)
    }

    return allValid && validExpression
  }, true)

  if (!validate) {
    return
  }

  // Roll the dice!
  expressions.forEach(expression => {
    const outcome = rollExpression(expression)
    const messageParts = [
      `${expression}: (${outcome.join(', ')})`
    ]

    if (options.total) {
      messageParts.push(`total: ${outcome.reduce((a, e) => a + e, 0)}`)
    }

    if (options.max) {
      messageParts.push(`max: ${outcome.reduce((a, e) => e > a ? e : a)}`)
    }

    if (options.min) {
      messageParts.push(`min: ${outcome.reduce((a, e) => e < a ? e : a)}`)
    }

    bot.reply(envelope, messageParts.join(' '))
  })
}

function checkExpression(expression) {
  if (expression.match(/^\d+d\d+([+-]\d+)?$/) === null) {
    return false
  }

  const [roll, modifier] = expression.split(/(?=\+)/, 2)
  const [diceCount, diceType] = roll.split('d')

  return diceCount <= 30 && diceType <= 1000
}

function rollExpression(expression) {
  const [roll, rawModifier] = expression.split(/(?=\+)/, 2)
  const [diceCount, diceType] = roll.split('d')
  const modifier = parseInt(rawModifier || 0, 10)

  return Array.from({length: diceCount}, () => {
    return getRandomInt(1, diceType) + modifier
  })
}


export default function register(bot, config) {
  bot.addCommand('roll', roll)
}
