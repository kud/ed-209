exports.js = function() {
  var str = Array.prototype.join.call(arguments, ' ')

  return "> " + evalBox(str)
}

var evalBox = (function(){
  function require() { throw "fucker"; }
  var module
  return function(str){
    try {
      if (str.match(/\bif\b|\bwhile\b|\bfor\b/) !== null) {
        return "Shove it up your ass, fucker"
      }
      var r = eval(str)
      return "" + r
    } catch(e){
      return "Errored, fucker"
    }
  }
})();


