exports.matcher = function(message, envelope) {
  console.log(envelope.from +
              (envelope.type == 'channel' ? '['+envelope.to+']' : '') +
              ': ' +
              message)
  return false
}
