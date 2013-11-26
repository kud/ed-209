var ram = Object.create(null)

exports.name = "ram"

exports.register = function(bot) {
  bot.ram = ram.create()
}

ram.create = function(){
  var self = Object.create(this)
  self.constructor.apply(self, arguments)
  return self
}

ram.constructor = function() {
  this.store = {}
}

ram.set = function(key, value) {
  this.store[key] = value
}

ram.get = function(key) {
  return this.store[key]
}
