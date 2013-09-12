Bot API
=======

This document is a draft for the public API of the ed-209 bot.

## Goals

The Bot class is the base layer for ed-209. It provides a plugin mechanism for
developers to add functionality to ed-209.

Plugins can interact with the IRC the stream through a Bot instance.

For each received message, each plugin may react, produce events and respond
through the bot.

## Public API

### Bot Object

#### `Bot` 

Object containing the inherits of a `bot` instance. 

#### `Bot.create(client, [config])` 

Method to create a `bot` instance. 

##### Param `client`

The connected IRC client. Refer to the [node-irc doc][doc:node-irc]

##### Param `config`

The config object stores the global bot configuration. Developpers should use
this in a read-only fashion, and use private configuration objects for their
plugins as it may produce clashes between plugins.

The available fields are:

* `botName`: the IRC nick of the bot
* `channels`: an array channel names that the bot joins upon startup
* `server`: the IRC server where the bot operates
* `debug`: a boolean used to toggle debug mode

### Prototype

####  `PENDING`
`1` (`1 << 0`)
####  `BUSY`
`2` (`1 << 1`)
####  `ACTIVATED`
`4` (`1 << 2`)

#### `status` 

number resulting in the `OR` bitwise addition of the consts matching the current status of `bot`. 

####  `client`

object, property descriptor makes it non writable (but configurable), Bound IRC Client. 

####  `config`

Object, property descriptors makes its properties non writable (but configurable), he configuration object 

#### `create(client, config)` 

Creates a new `bot` instance that inherits from the `thisValue` bot. 

#### `getCommand([commandName])`

If no `name` is specified, returns an object of all the available command names, with each key as `name` (string) and value as a boolean defining whether the command is activated or not. 

If `name` is a `String`, return a boolean defining if the `commandName` command is activated or `null` if the `commandName` doesn't exist. 

If `name` is an `Array`, ruturn a filtered object containing booleans. 

#### `addCommand(commandName[, handler][, cancelActivation])`

Creates a command listener by its name, or creates one from the `pluginName` and optional `handler`. By default, commands are activitated as soon as they are added, but the `cancelActivation` can prevent that behaviour. 

#### `stopCommand(commandName)`

Disable a command by its name

#### `removeCommand(commandName)`

Removes a command by its name

## Plugin definitions

A plugin is a standard Node.js module, exporting at least two properties:

* `name`: MUST be a non-empty unique string.
* `handler`: MUST be a function. It takes a bot object as its sole argument.

An example of a minimal plugin can be found below:

``` js
(function(plugin) {
  plugin.name = "noop";

  plugin.handler = function(bot) {
  }
})(exports);
```

The code is wrapped in a function so you have a specific context. 

or 
``` js
var bot = Bot.create(client, config)
bot.addCommand("noop", function(bot){})
```


## Common patterns

