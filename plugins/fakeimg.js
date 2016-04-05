const USAGE = `fakeimg [width [height [text [font]]]]`


function fakeimg(envelope, width, height, text, font) {
  const {client, to} = envelope

  if (width === '--help') {
    return client.say(to, USAGE)
  }

  const reply = [
    'http://fakeimg.pl/',
    width,
    height && `x${height}`,
    text && `/?text=${encodeURIComponent(text)}`,
    font && `&font=${encodeURIComponent(font)}`,
  ].join('')

  client.say(to, reply)
}

export default function register(bot) {
  bot.addCommand('fakeimg', fakeimg)
}
