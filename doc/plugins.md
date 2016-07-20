# alert

The alert plugins allows to notify all users of a channel with a given message.

## Provided commands

-   `alert`

**Parameters**

-   `bot`  

# memory

This plugin provides a simple persistence layer for the bot using a JSON
file as the backend.

See the [memory.Memory](memory.Memory) class documentation for details about the provided API.

This API is available using the `memory` property of the `Bot` instance.

## Requirements and setup

You will need to create the memory file (see the [`file`](#memory-file-option)
option). It needs to be a valid JSON data structure, so if you need a blank
database, just put `{}` in the file.

## Configuration options

-   <a name="memory-file-option"></a> `file [string]` (default:
    `"memory.json"`): Path to the file that is used to save the database.

**Parameters**

-   `bot`  
-   `config`  

## Memory

Memory class
