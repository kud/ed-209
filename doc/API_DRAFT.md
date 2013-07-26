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

### Attributes

* `client`: the connected IRC client. Refer to the [node-irc doc][doc:node-irc]
  for details.
* `config`: the configuration object (details below)

#### The `config` object

The config object stores the global bot configuration. Developpers should use
this in a read-only fashion, and use private configuration objects for their
plugins as it may produce clashes between plugins.

The available fields are:

* `botName`: the IRC nick of the bot
* `channels`: an array channel names that the bot joins upon startup
* `server`: the IRC server where the bot operates
* `debug`: a boolean used to toggle debug mode

### Methods

#### `listPlugins()`

Returns an array of all the enabled plugins names

#### `addPlugin(pluginName)`

Enable a plugin by its name

#### `removePlugin(pluginName)`

Disable a plugin by its name

#### `getPlugin(pluginName)`

Retrieve an enabled plugin's object by it's name and return it

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

## Common patterns

