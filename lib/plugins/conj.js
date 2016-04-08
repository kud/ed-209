const USAGE = 'conj [verb] - Shows French conjugation of a verb'

export default function register(bot) {
  bot.addCommand('conj', (envelope, ...args) => {
    if (args[0] === '--help') {
      return bot.reply(envelope, USAGE)
    }

    const reply = 'http://leconjugueur.lefigaro.fr/conjugaison/verbe/' + encodeURIComponent(args.join(' ')) + '.html';
    bot.reply(envelope, reply)
  })
}
