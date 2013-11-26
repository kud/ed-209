var fs     = require("fs"),
    memory = Object.create(null)

exports.name = "memory"

exports.register = function(bot) {
  bot.memory = memory.create(bot)
}

memory.create = function(){
  var self = Object.create(this)
  self.constructor.apply(self, arguments)
  return self
}

memory.constructor = function(bot) {
  this.bot   = bot
  this.store = {}
}

memory.namespace = function(namespace) {
  var self = this

  if (!this.get(namespace)) {
    this.set(namespace, {})
  }

  return {
    _store: self.get(namespace),

    set: function(key, value) {
      this._store[key] = value
    },

    get: function(key) {
      return this._store[key]
    },

    commit: function() {
      self.commit()
    }
  }
}

memory.set = function(key, value) {
  this.store[key] = value
}

memory.get = function(key) {
  return this.store[key]
}

memory.commit = function() {
  fs.writeFile("memory.json", JSON.stringify(this.store), function(err) {
    if (err) {
      console.error(err)
    } else {
      console.log(this.bot.colors.blue("Memory saved"))
    }
  })
}
