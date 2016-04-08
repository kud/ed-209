const USAGE = 'fakeimg [width [height [text [font]]]] - Creates an URL for a placeholder image'

export default function register(bot) {
  bot.addCommand('fakeimg', (envelope, width, height, text, font) => {
    if (width && width === '--help') {
      return bot.reply(envelope, USAGE)
    }

    const reply = [
      'http://fakeimg.pl/',
      width,
      height && `x${height}`,
      text && `/?text=${encodeURIComponent(text)}`,
      font && `&font=${encodeURIComponent(font)}`,
    ].join('')

    bot.reply(envelope, reply)
  })
}
