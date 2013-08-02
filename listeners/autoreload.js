var spawn = require('child_process').spawn;

var listener = {
  matcher: function(message, envelope) {
    return envelope.type == 'notice'       &&
           envelope.from !== undefined     &&
           message.search('pushed') !== -1 &&
           message.search('master') !== -1 &&
           message.search('git.io') !== -1
  },

  callback: function(message, envelope) {
    var git = spawn('git', ['pull'])
        self = this;

    git.on('close', function(code) {
      console.log('git pull finished: '+code);
      self.reply(envelope, 'Changes pulled');
    });
  }
}

module.exports = listener;
