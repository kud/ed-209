import chalk from 'chalk'
import shellwords from 'shellwords'

import {findCommand} from './utils'

export default class Bot {
  constructor(client, config) {
    this.client = client
    this.config = config
    this.commands = {}
    this.filters = {}
  }

  register(pluginName, pluginConfig) {
    let plugin

    try {
      plugin = require(`./plugins/${pluginName}`).default
    } catch (e) {
      this.error(`Unable to load plugin ${pluginName}`)
      this.error(e)
      process.exit(1)
    }

    const loaded = plugin(this, pluginConfig)

    this.info(`Registered plugin ${pluginName}`)

    return loaded === false ? false : true
  }

  reply(envelope, message) {
    switch (envelope.context) {
    case 'channel':
      this.say(envelope.to, message)
      break
    case 'pm':
      this.say(envelope.from, message)
      break
    }
  }

  say(to, message) {
    this.client.say(to, message)
  }

  broadcast(message) {
    for (const channel of this.config.channels) {
      this.say(channel, message)
    }
  }

  addCommand(command, handler, contexts = ['channel', 'pm']) {
    this.commands[command] = {handler, contexts}
  }

  addFilter(filter, contexts = ['channel', 'pm']) {
    for (const context of contexts) {
      if (!this.filters[context]) {
        this.filters[context] = [filter]
        continue
      }
      this.filters[context].push(filter)
    }
  }

  listen(envelope) {
    const catchedCommand = findCommand(envelope, this.client.nick)

    if (catchedCommand) {
      this.handleCommand(catchedCommand[1], envelope)
    }

    const applicableFilters = this.filters[envelope.context] || []
    for (const filter of applicableFilters) {
      filter(this, envelope)
    }
  }

  handleCommand(commandLine, envelope) {
    const args = shellwords.split(commandLine)
    const commandName = args.shift()
    const command = this.commands[commandName]

    if (!command) {
      this.reply(envelope, 'Unknown command, sucker. :]')
      return false
    }

    if (command.contexts.indexOf(envelope.context) === -1) {
      this.reply(envelope, 'Cannot do this here, sucker. :]')
      return false
    }

    try {
      command.handler(this, envelope, ...args)
      return true
    } catch (e) {
      this.reply(envelope, 'Hmm, seems like I fucked up, again')
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
