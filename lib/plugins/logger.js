import chalk from 'chalk'

function channelFilter(bot, {from, to, message}) {
  console.log(chalk.yellow(`${to} <${from}> ${message}`))
}

function pmFilter(bot, {from, message}) {
  console.log(chalk.yellow.bold(`=> <${from}> ${message}`))
}

function joinFilter(bot, {channel, nick}) {
  console.log(chalk.grey(`${nick} joins ${channel}`))
}

function partFilter(bot, {channel, nick}) {
  console.log(chalk.grey(`${nick} leaves ${channel}`))
}

export default function register(bot) {
  bot.addFilter(channelFilter, ['channel'])
  bot.addFilter(pmFilter, ['pm'])
  bot.addFilter(joinFilter, ['join'])
  bot.addFilter(partFilter, ['part'])
}
