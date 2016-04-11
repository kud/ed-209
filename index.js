#!/usr/bin/env node

import fs from 'fs'
import irc from 'irc'
import chalk from 'chalk'

import Bot from './lib/bot'

// Load configuration
if (!fs.existsSync('config.json')) {
  console.log(chalk.red('Wow, wow, wow! Please, have a `config.json` for fuck\'s sake!'))
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

// The Bot
const bot = new Bot(client, config)

// Register activated plugins
const failedPlugins = []
for (const plugin of config.plugins) {
  const loadWithConfig = typeof plugin === 'object'
  const pluginName = loadWithConfig ? plugin[0] : plugin
  const config = loadWithConfig ? plugin[1] : {}

  const registered = bot.register(pluginName, config)

  if (!registered) {
    failedPlugins.push(pluginName)
  }
}
if (failedPlugins.length) {
  bot.error(`Failed to load some plugins: ${failedPlugins.join(', ')}`)
  bot.error('Fix your fucking config ffs')
}

client.addListener('message', (from, to, message) => {
  if (to === config.nick) {
    return // This is handled by the 'pm' listener
  }
  bot.listen({context: 'channel', from, to, message})
})

if (config.password !== undefined) {
  client.addListener('registered', () => {
    bot.info('Registering')
    client.say('NickServ', `identify ${config.password}`)
  })
}

client.addListener('pm', (from, message) => {
  bot.listen({context: 'pm', from, message})
})

client.addListener('join', (channel, nick) => {
  bot.listen({context: 'join', channel, nick})
})

client.addListener('error', (error) => {
  bot.error(error)
})


bot.info(`Go go go!`)
