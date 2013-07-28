exports.list = function() {
  var keys = [];
  for(var key in this){
    if (key == "list") continue;
    keys.push(key);
  }

  return 'List: ➤ ' + keys.join('  ➤ ');
}
