const USAGE = 'fakeimg [width [height [text [font]]]] - Creates an URL for a placeholder image'

function fakeimg(bot, envelope, ...args) {
  if (args[0] === '--help') {
    return bot.reply(envelope, USAGE)
  }

  const [width, height, text, font] = args
  const reply = [
    'http://fakeimg.pl/',
    width,
    height && `x${height}`,
    text && `/?text=${encodeURIComponent(text)}`,
    font && `&font=${encodeURIComponent(font)}`,
  ].join('')

  bot.reply(envelope, reply)
}

export default function register(bot) {
  bot.addCommand('fakeimg', fakeimg)
}
