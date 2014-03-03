;(function(listener) {
  listener.providesCommand = 'alert'

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.util.matchesCommand('alert', message)
  }

  listener.callback = function(message, envelope) {
    var str = this.util.removeCommand(message, 'alert'),
        channelData = this.client.chans[envelope.to],
        users = [],
        u

    for (u in channelData.users) {
      if (u == 'ChanServ')       continue
      if (u == envelope.from)    continue
      if (u == this.client.nick) continue
      users.push(u)
    }

    if (str.trim().length == 0) {
      str = "wake up morons!"
    }

    this.reply(envelope, users.join(' '))
    this.reply(envelope, str)
  }

})(exports)
