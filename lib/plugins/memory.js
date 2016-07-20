import fs from 'fs'
import path from 'path'

/**
 * Memory class
 * @memberof memory
 */
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
 * See the {@link memory.Memory} class documentation for details about the provided API.
 *
 * This API is available using the `memory` property of the `Bot` instance.
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
 * @module memory
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
