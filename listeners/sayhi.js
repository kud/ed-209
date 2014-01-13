var listener = require("../lib/listener")

module.exports = listener.create("sayhi", {
  route : "{botName:name}sayhi",
  callback : function(name){
    return name + " says hi!"
  }
})
