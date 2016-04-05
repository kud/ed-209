import chalk from 'chalk'
import shellwords from 'shellwords'

export default class Bot {
  constructor() {
    this.commands = {}
    this.filters = {
      channel: [],
    }
  }

  addCommand(command, handler, contexts = {channel: true}) {
    this.commands[command] = {handler, contexts}
  }

  addFilter(pattern, handler, contexts = {channel: true}) {
    for (const context in contexts) {
      this.filters[context].push({pattern, handler})
    }
  }

  handleCommand(commandLine, envelope) {
    const {client, to} = envelope
    const args = shellwords.split(commandLine)
    const commandName = args.shift()
    const command = this.commands[commandName]

    if (!command) {
      client.say(to, 'Unknown command, sucker. :]')
      return false
    }

    if (!('channel' in command.contexts)) {
      client.say(to, 'Cannot do this here, sucker. :]')
      return false
    }

    try {
      command.handler(envelope, ...args)
      return true
    } catch (e) {
      client.say(to, 'Hmm, seems like I fucked up, again')
      this.error(`[${commandName}] ${e}`)
      return false
    }
  }

  info(message) {
    console.log(chalk.grey(`[INFO] ${message}`))
  }

  error(message) {
    console.log(chalk.red(`[ERROR] ${message}`))
  }
}
