exports.matcher = function(message, envelope) {
  var self = this
  console.log("  " + 
              (envelope.type == 'channel' ? self.colors.yellow(envelope.to) + ' > ' : '> ') +
              self.colors.blue(envelope.from) +
              ': ' +
              message)
  return false
}
