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
        mem = this.memory.namespace("alert"),
        u

    for (u in channelData.users) {
      if (u == 'ChanServ')       continue
      if (u == envelope.from)    continue
      if (u == this.client.nick) continue
      if (mem.get(u) == false)   continue
      users.push(u)
    }

    if (str.trim().length == 0) {
      str = "wake up morons!"
    }

    if (str.trim() == "--subscribe") {
      mem.set(envelope.from, true)
      mem.commit()
      this.reply(envelope, envelope.from + ": welcome back!")
      return
    }

    if (str.trim() == "--unsubscribe") {
      mem.set(envelope.from, false)
      mem.commit()
      this.reply(envelope, envelope.from + ": sorry to see you go :(")
      return
    }

    if (str.trim().substr(0,2) == "--") {
      mem.set(envelope.from, false)
      mem.commit()
      this.reply(envelope, envelope.from + ": lolwut? unknown argument, noob")
      return
    }

    this.reply(envelope, users.join(' '))
    this.reply(envelope, str)
  }

})(exports)
