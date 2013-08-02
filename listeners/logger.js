exports.matcher = function(message, envelope) {
  console.log([
    envelope.type == 'notice' ? '-- ' : '',
    envelope.from !== undefined ? envelope.from : '<server>',
    (
      (envelope.type == 'channel' || envelope.type == 'notice')
      ? ' ['+envelope.to+']'
      : ''
    ),
    ': ',
    message
  ].join(''));
  return false;
}
