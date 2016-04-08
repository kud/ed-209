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

export default function register(bot, config) {
  const database = config.file || 'memory.json'

  if (!fs.existsSync(database)) {
    bot.error(`[memory] Missing database ${database}`)
    bot.error('[memory] You might need to create it')
    process.exit(1)
  }

  bot.memory = new Memory(bot, database)
}
