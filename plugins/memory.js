var memory = Object.create(null)

exports.name = "memory"

exports.register = function(bot) {
  bot.memory = memory.create()
}

memory.create = function(){
  var self = Object.create(this)
  self.constructor.apply(self, arguments)
  return self
}

memory.constructor = function() {
  this.store = {}
}

memory.set = function(key, value) {
  this.store[key] = value
}

memory.get = function(key) {
  return this.store[key]
}
