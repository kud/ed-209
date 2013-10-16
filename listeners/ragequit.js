;(function(listener) {
  listener.providesCommand = 'ragequit'

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.util.matchesCommand('ragequit', message)
  }

  listener.callback = function(message, envelope) {
    var self = this,
        timeout = 1000 * (10 + Math.floor(Math.random() * 10)),
        finalWords = [
          "oh et puis merde",
          "oh et puis allez tous vous faire enculer",
          "lol ok",
          "j'aurais pas du arrêter mon pomodoro"
        ],
        finalWord = finalWords[Math.floor(Math.random() * finalWords.length)],
        intros = [
          "vous êtes cons quand même",
          "re"
        ],
        intro = intros[Math.floor(Math.random() * intros.length)]

    this.reply(envelope, finalWord)
    self.part(envelope.to)

    setTimeout(function() {
      self.join(envelope.to)
      self.reply(envelope, intro)
    }, timeout)
  }

})(exports)
