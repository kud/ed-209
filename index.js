#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import util from 'util'
import irc from 'irc'
import shellwords from 'shellwords'
import chalk from 'chalk'

import * as plugins from './lib/plugins'

// The Bot
const bot = {
  commands: {},

  addCommand(command, handler, contexts = {channel: true}) {
    this.commands[command] = {handler, contexts}
  },

  info(message) {
    console.log(chalk.grey(`[INFO] ${message}`))
  },

  error(message) {
    console.log(chalk.red(`[ERROR] ${message}`))
  },
}

// Load configuration
if (!fs.existsSync('config.json')) {
  bot.error('Wow, wow, wow! Please, have a `config.json` for fuck\'s sake!')
  process.exit(1)
}
const config = require('./config.json')

// IRC Client
const client = new irc.Client(config.server, config.nick, {
  channels: config.channels,
  floodProtection: config.flood.protection,
  floodProtectionDelay: config.flood.delay,
  secure: config.ssl,
  sasl: config.sasl,
  userName: config.nick,
  password: config.password,
  port: config.port,
  messageSplit: 1024,
  encoding: "UTF-8"
})

// Register activated plugins
for (const plugin of config.plugins) {
  const loadWithConfig = typeof plugin === 'object'
  const pluginName = loadWithConfig ? plugin[0] : plugin
  const config = loadWithConfig ? plugin[1] : {}
  const register = plugins[pluginName]

  bot.info(`Registered plugin ${pluginName}`)
  register(bot, config, client)
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
      bot.error(`[${commandName}] ${e}`)
    }
  }
})


if (config.password !== undefined) {
  client.addListener('registered', () => {
    bot.info('Registering')
    client.say('NickServ', `identify ${config.password}`)
  })
}

client.addListener('pm', (from, message) => {
  console.log(chalk.yellow.bold(`PM ${from}: ${message}`))
})

client.addListener('join', (channel, nick) => {
  if (nick === config.nick) {
    bot.info(`Joining ${channel}`)
  }
})

client.addListener('error', (error) => {
  bot.error(util.inspect(error))
})


bot.info(`Go go go!`)
