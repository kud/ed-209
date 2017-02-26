# alert

This plugin allows to notify all users of a channel with a given message.

## Requirements and setup

-   [memory](#memory) plugin

## Provided commands

-   `alert [--subscribe|--unsubscribe|MESSAGE]`: Broadcast a message to all
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

# echo

This plugin makes the bot echo back everything it sees. Yes, it is quite annoying.

**Parameters**

-   `bot`  

# imdb

The imdb plugins automatically expands imdb URLs with informations
from `myapifilms.com`

## Requirements and setup

You need a tokken from <http://www.myapifilms.com/token.do>

## Configuration options

-   `myApiFilms`

**Parameters**

-   `bot`  
-   `config`  

# imgur

The imgur plugins automatically expands imgur URLs with informations
from imgur (title, NSFW tag, ...).

## Requirements and setup

You need to create an application at <https://api.imgur.com/oauth2/addclient>
to retrieve your credentials (see below).

## Configuration options

-   `clientId`:

All these parameters can be found in the apps console
(<https://imgur.com/account/settings/apps>)

**Parameters**

-   `bot`  
-   `config`  

# invite

This plugin allows the bot to join channels it is invited on.

## Configuration options

-   `joinMessage`: A message that will be sent to the channel after joining.
    Defaults to "Hello there!".

**Parameters**

-   `bot`  
-   `config`  

# leave

This plugin adds the `leave` command, allowing to force the bot to leave a
channel.

## Configuration options

-   `leaveMessage`: A message that will be sent to the channel before leaving.
    Defaults to "Bye there!".

## Provided commands

-   `leave`: Forces the bot to leave the current channel

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

# quote

The quote plugins allow users to save quotes and replay them later.

## Requirements and setup

-   [memory](#memory) plugin

## Provided commands

-   `quote [--add QUOTE|--random|--count|QUOTE_ID]`: Save quotes and replay them later

**Parameters**

-   `bot`  

# twitter

The twitter plugins automatically expands twitter statuses URLs to the
contents of the tweet, also expanding media URLs in the tweet.

## Requirements and setup

-   `npm install twitter`

You need to create an application at <https://apps.twitter.com/> to
retrieve your credentials (see below).

## Configuration options

-   `consumerKey`
-   `consumerSecret`
-   `accessTokenKey`
-   `accessTokenSecret`

All these parameters can be found in the apps console (<https://apps.twitter.com/>)

**Parameters**

-   `bot`  
-   `config`  

# url

The url plugin plugins automatically fetches website titles and displays
them in the channel.

## Requirements and setup

-   `npm install node-fetch cheerio`

## Configuration options

-   `blacklist`: a list of URL patterns to exclude from expansion

**Parameters**

-   `bot`  
-   `config`  
