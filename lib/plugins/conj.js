const USAGE = 'conj [verb] - Shows French conjugation of a verb'

function conj(bot, envelope, ...args) {
  if (args[0] === '--help') {
    return bot.reply(envelope, USAGE)
  }

  const reply = 'http://leconjugueur.lefigaro.fr/conjugaison/verbe/' + encodeURIComponent(args.join(' ')) + '.html';
  bot.reply(envelope, reply)
}

export default function register(bot) {
  bot.addCommand('conj', conj)
}
