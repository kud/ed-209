#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import util from 'util'
import irc from 'irc'
import shellwords from 'shellwords'
import chalk from 'chalk'

// Load configuration
if (!fs.existsSync('config.json')) {
  console.error(chalk.red('Wow, wow, wow! Please, have a `config.json` for fuck\'s sake!'))
  process.exit(1)
}
const config = require('./config.json')

import * as plugins from './plugins'

// The Bot
const bot = {
  commands: {},

  addCommand(command, handler, contexts = {channel: true}) {
    this.commands[command] = {handler, contexts}
  }
}

// IRC Client
const client = new irc.Client(config.server, config.nick, {
  channels: config.channels,
  floodProtection: config.flood.protection,
  floodProtectionDelay: config.flood.delay
})

// Register activated plugins
for (const pluginName in plugins) {
  const plugin = plugins[pluginName]

  if (pluginName in config.plugins) {
    console.log(chalk.gray(`Registered plugin ${pluginName}`))
    plugin(bot, config.plugins[pluginName], client)
  }
}

client.addListener('message', (from, to, message) => {
  if (to === config.nick) {
    return // This is handled by the 'pm' listener
  }
  console.log(chalk.yellow(`${from} => ${to}: ${message}`))

  // Message to the bot
  if (message.search(config.nick) === 0) {
    const commandRE = new RegExp(`^${config.nick}(?::|,) (.*)`)
    const catchedCommand = message.match(commandRE)

    if (!catchedCommand) {
      return
    }

    const plainCommand = catchedCommand[1]
    const args = shellwords.split(plainCommand)
    const commandName = args.shift()
    const command = bot.commands[commandName]

    if (!command) {
      client.say(to, 'Unknown command, sucker. :]')
      return
    }

    if (!('channel' in command.contexts)) {
      client.say(to, 'Cannot do this here, sucker. :]')
      return
    }

    try {
      const envelope = {client, from, to, message}
      command.handler(envelope, ...args)
    } catch (e) {
      client.say(to, 'Hmm, seems like I fucked up, again')
      console.error(`[ERROR] [${commandName}] ${e}`)
    }
  }
})

client.addListener('pm', (from, message) => {
  console.log(chalk.yellow.bold(`PM ${from}: ${message}`))
})

client.addListener('error', (error) => {
  console.error(chalk.red(`[ERROR] ${util.inspect(error)}`))
})


console.log(chalk.gray('Go go go!'))
