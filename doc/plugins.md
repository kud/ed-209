# alert

This plugin allows to notify all users of a channel with a given message.

## Requirements and setup

-   [memory](#memory) plugin

## Provided commands

-   `alert [--subscribe|--unsubscribe|message]`: Broadcast a message to all
    subscribed users

**Parameters**

-   `bot`  

# blank

This is a blank plugin used as a template for your own plugin.

## Requirements and setup

List other required plugins and setup instructions here.

## Configuration options

Describe the plugin configuration options.

## Provided commands

List provided commands, their options and their usage.

**Parameters**

-   `bot`  
-   `config`  

# caniuse

This plugin adds a `caniuse` command that can be used to query for support
information using the [caniuse](http://caniuse.com) database.

## Provided commands

-   `caniuse [feature]`: Get support information for a web feature

**Parameters**

-   `bot`  
-   `config`  

# memory

This plugin provides a simple persistence layer for the bot using a JSON
file as the backend.

## Requirements and setup

You will need to create the memory file (see the [`file`](#memory-file-option)
option). It needs to be a valid JSON data structure, so if you need a blank
database, just put `{}` in the file.

## Configuration options

-   <a name="memory-file-option"></a> `file [string]` (default:
    `"memory.json"`): Path to the file that is used to save the database.

## Usage

Enabling the `memory` plugin adds a `memory` property on the `Bot` instance
with the following API:

-   `set(key, value)`: Stores a given value to the specified key
-   `get(key)`: Returns the value stored at the specified key
-   `namespace(key)`: Returns an object with `set`/`key` and `commit` methods
    bound to a given key in the store
-   `commit()`: Saves changes to the JSON file

**Parameters**

-   `bot`  
-   `config`  

**Examples**

_Basic usage_

```javascript
bot.set("my-key", "a-value")
bot.get("my-key") // => "a-value"
```

_Using namespaces_

```javascript
const namespace = bot.namespace("myplugin")
namespace.set("some-key", "a-value")
namespace.commit()
// Data file now has the following object:
{"myplugin": {"some-key": "a-value"}}
```
