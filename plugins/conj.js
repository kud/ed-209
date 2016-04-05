function conj(command, ...params) {
  const reply = 'http://leconjugueur.lefigaro.fr/conjugaison/verbe/' + encodeURIComponent(params.join(' ')) + '.html';

  command.client.say(command.to, reply)
}

export default function register(bot) {
  bot.addCommand('conj', conj)
}
