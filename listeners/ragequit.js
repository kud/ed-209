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
          "j'aurais pas du arrêter mon pomodoro",
          "mais bordel, vos gueules",
          "en parlant de pause",
          "bon je vous quitte la propension à juger les autres m'hérisse le poil",
          "Tu peux modérer un peu tes propos ?", // https://github.com/putaindecode/website/issues/99#issuecomment-30603139
          "Parfois je me demande si ce salon sert vraiment à quelque chose"
          // quote de l'event "Shahor lefts", avec modification de "il a" par "il y a" pour une meilleur réutilisation
          , "visiblement il y a un truc contre moi que je ne comprends pas bien, mais qui existe"
          , "bref j'ai des kiwi à planter"
          , "whatever"
          , "bon je vais finir mon grillage :)"
        ],
        finalWord = finalWords[Math.floor(Math.random() * finalWords.length)],
        intros = [
          "vous êtes cons quand même putain",
          "re",
          "resiously"
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
