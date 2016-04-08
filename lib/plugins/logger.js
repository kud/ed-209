import chalk from 'chalk'

export default function register(bot) {
  bot.addFilter(({from, to, message}) => {
    console.log(chalk.yellow(`${to} <${from}> ${message}`))
  }, ['channel'])
  bot.addFilter(({from, message}) => {
    console.log(chalk.yellow.bold(`=> <${from}> ${message}`))
  }, ['pm'])
  bot.addFilter(({channel, nick}) => {
    console.log(chalk.grey(`${nick} joins ${channel}`))
  }, ['join'])
}
