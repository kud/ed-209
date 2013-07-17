exports.mdn = function(param) {
  return 'https://developer.mozilla.org/en-US/search?q=' + encodeURIComponent(param) + '&sitesearch=developer.mozilla.org';
}

exports.google = function(param) {
  return 'https://www.google.com/search?q=' + encodeURIComponent(param)
}

exports.caniuse = function(param) {
  return 'http://caniuse.com/#search=' + encodeURIComponent(param);
}
