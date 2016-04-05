function conj(envelope, ...args) {
  const {client, to} = envelope
  const reply = 'http://leconjugueur.lefigaro.fr/conjugaison/verbe/' + encodeURIComponent(args.join(' ')) + '.html';

  client.say(to, reply)
}

export default function register(bot) {
  bot.addCommand('conj', conj)
}
