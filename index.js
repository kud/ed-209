#!/usr/bin/env node

import fs from 'fs'
import irc from 'irc'
import chalk from 'chalk'

import Bot from './lib/bot'
import * as plugins from './lib/plugins'

// The Bot
const bot = new Bot()

// Load configuration
if (!fs.existsSync('config.json')) {
  bot.error('Wow, wow, wow! Please, have a `config.json` for fuck\'s sake!')
  process.exit(1)
}
const config = require('./config.json')
bot.config = config

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

  if (!register) {
    bot.error(`Missing plugin ${pluginName}`)
    process.exit(1)
  }

  register(bot, config, client)
  bot.info(`Registered plugin ${pluginName}`)
}

client.addListener('message', (from, to, message) => {
  if (to === config.nick) {
    return // This is handled by the 'pm' listener
  }
  const envelope = {client, from, to, message}

  // Log
  console.log(chalk.yellow(`${from} => ${to}: ${message}`))

  // Message to the bot
  if (message.search(config.nick) === 0) {
    const commandRE = new RegExp(`^${config.nick}(?::|,) (.*)`)
    const catchedCommand = message.match(commandRE)

    if (!catchedCommand) {
      return
    }

    if (bot.handleCommand(catchedCommand[1], envelope)) {
      return // Skip filters if the command was handled
    }
  }

  // Filters
  for (const filter of bot.filters.channel) {
    if (message.match(filter.pattern) !== null) {
      filter.handler(envelope, message)
      break
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
  bot.error(error)
})


bot.info(`Go go go!`)
