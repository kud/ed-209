export default function register(bot) {
  bot.addCommand('forkyou', ({client, to}) => {
    client.say(to, 'Please, please, please https://github.com/kud/ed-209')
  } )
}
