exports.version = function() {
  return "I'm at "+ require('fs').readFileSync('.git/refs/heads/master');
}
