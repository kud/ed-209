const USAGE = 'conj [verb] - Shows French conjugation of a verb'

function conj(envelope, ...args) {
  const {client, to} = envelope

  if (args[0] === '--help') {
    return client.say(to, USAGE)
  }

  const reply = 'http://leconjugueur.lefigaro.fr/conjugaison/verbe/' + encodeURIComponent(args.join(' ')) + '.html';

  client.say(to, reply)
}

export default function register(bot) {
  bot.addCommand('conj', conj)
}
