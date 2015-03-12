;(function(listener) {
  listener.providesCommand = 'ragequit'

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.util.matchesCommand('ragequit', message)
  }

  listener.callback = function(message, envelope) {
    var self = this,
        timeout = 1000 * (10 + Math.floor(Math.random() * 10)),
        
        // please comment each quotes
        finalWords = [
          // kud irc quotes
          "oh et puis merde",
          "oh et puis allez tous vous faire enculer",
          "lol ok",
          "j'aurais pas dû arrêter mon pomodoro",
          "mais bordel, vos gueules",
          "en parlant de pause",
          "bon je vous quitte, la propension à juger les autres m'hérisse le poil",
          "Parfois je me demande si ce salon sert vraiment à quelque chose",
          
          // moox irc quotes
          "bref, j'ai des kiwi à planter",
          "bon je vais finir mon grillage :)",
          
          // random quotes
          "whatever",
          "j'vous encule",
          "merci tout de même, bonne soirée",
          
          // https://github.com/putaindecode/website/issues/99#issuecomment-30603139
          "Tu peux modérer un peu tes propos ?",
          
          // quote de l'event "Shahor lefts", avec modification de "il a" par "il y a" pour une meilleur réutilisation
          "visiblement il y a un truc contre moi que je ne comprends pas bien, mais qui existe",
          
          // https://twitter.com/NASIRHEAT/status/574575661098078209
          "JE VOUS CHIE SUR LA GEULLE AU CALME AVEC UN THÉ FRAIS",
        ],
        finalWord = finalWords[Math.floor(Math.random() * finalWords.length)],
        intros = [
          "vous êtes cons quand même putain",
          "re",
          "resiously",
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
