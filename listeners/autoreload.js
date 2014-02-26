/**
 * Autoreload
 */

var spawn = require('child_process').spawn;

var listener = {
  matcher: function(message, envelope) {
    return envelope.from == 'putaindebot'        &&
           message.search('\\[ed-209\\]') !== -1 &&
           message.search('pushed') !== -1       &&
           message.search('master') !== -1       &&
           message.search('git.io') !== -1
  },

  callback: function(message, envelope) {
    var git = spawn('git', ['pull'])
        self = this;

    git.on('close', function(code) {
      console.log('git pull finished: '+code);
      self.reply(envelope, 'Wouaaah! I\'ve been upgradeeed! Yikes!');
    });
  }
}

module.exports = listener;
