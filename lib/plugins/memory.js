import fs from 'fs'
import path from 'path'

class Memory {
  constructor(bot, database) {
    this._bot = bot
    this._database = database

    try {
      this._store = JSON.parse(fs.readFileSync(database))
    } catch (e) {
      this._bot.error(`[memory] Corrupted database file ${database}`)
      process.exit(1)
    }
  }

  set(key, value) {
    this._store[key] = value
  }

  get(key) {
    return this._store[key]
  }

  namespace(name) {
    const parent = this
    const store = {}

    this.set(name, store)

    return {
      set(key, value) {
        store[key] = value
      },

      get(key) {
        return store[key]
      },

      commit() {
        parent.commit()
      }
    }
  }

  commit() {
    fs.writeFile(this._database, JSON.stringify(this._store), err => {
      if (err) {
        return this._bot.error(`[memory] Failed to save database: ${err}`)
      }

      this._bot.info(`[memory] Database saved`)
    })
  }
}

/**
 * This plugin provides a simple persistence layer for the bot using a JSON
 * file as the backend.
 *
 * ## Requirements and setup
 *
 * You will need to create the memory file (see the [`file`](#memory-file-option)
 * option). It needs to be a valid JSON data structure, so if you need a blank
 * database, just put `{}` in the file.
 *
 * ## Configuration options
 *
 * - <a name="memory-file-option"></a> `file [string]` (default:
 *   `"memory.json"`): Path to the file that is used to save the database.
 *
 * ## Usage
 *
 * Enabling the `memory` plugin adds a `memory` property on the `Bot` instance
 * with the following API:
 *
 * - `set(key, value)`: Stores a given value to the specified key
 * - `get(key)`: Returns the value stored at the specified key
 * - `namespace(key)`: Returns an object with `set`/`key` and `commit` methods
 *   bound to a given key in the store
 * - `commit()`: Saves changes to the JSON file
 *
 * @example <caption>Basic usage</caption>
 * bot.set("my-key", "a-value")
 * bot.get("my-key") // => "a-value"
 *
 * @example <caption>Using namespaces</caption>
 * const namespace = bot.namespace("myplugin")
 * namespace.set("some-key", "a-value")
 * namespace.commit()
 * // Data file now has the following object:
 * {"myplugin": {"some-key": "a-value"}}
 *
 */
export default function register(bot, config) {
  const database = config.file || 'memory.json'

  if (!fs.existsSync(database)) {
    bot.error(`[memory] Missing database ${database}`)
    bot.error('[memory] You might need to create it')
    process.exit(1)
  }

  bot.memory = new Memory(bot, database)
}
