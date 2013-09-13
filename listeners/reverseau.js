;(function(listener) {

  var replacements = {}
    , regExps = {}
    , replaceMethods = {}
    , _hasOwnProperty = {}.hasOwnProperty
    , i

  replacements["OP"] = "LE POSTEUR ORIGINAL"
  replacements["IS"] = "EST"
  replacements["A"] = "UN"
  replacements["FAGGOT"] = "FAGUEAU"
  replacements["NIGGA"] = replacements["NIGGER"] = "NÉGREAU"
  replacements["PLEASE"] = "S'IL VOUS PLAIT"
  replacements["PLS"] = replacements["PLZ"] = "SVP"
  replacements["INB4"] = "AVANT Ç4"
  replacements["LOL"] = "RIANT FORT"
  replacements["LOLOLOL"] = "RIANT FORIANT FORIANT FORT"
  replacements["TIL"] = "AUJOURD'HUI J'AI APPRIS QUE"
  replacements["OH"] = "ENTENDU AU DESSUS"
  replacements["WTF"] = "QUELLE EST LA BAISE ?"
  replacements["MIND BLOWN"] = "ESPRIT SOUFFLÉ"
  replacements["GG"] = "BINE JOUÉ"
  replacements["WAT"] = replacements["WUT"] = replacements["WOOT"] = "QOI"
  replacements["BITCH"] = "SALOPE"
  replacements["UMAD"] = "TU FOU"
  replacements["WHOSMAD"] = "QUI FOU"
  replacements["GRUNT"] = "GROGNEMENT"
  replacements["MAKE"] = "FABRIQUER"
  replacements["FILE"] = "FICHIER"
  replacements["MAKEFILE"] = "FICHIERFABRIQUER"
  replacements["COMMAND LINE"] = "LIGNE DE COMMANDES"
  replacements["SHELL"] = replacements["TERMINAL"] = "CMD.EXE"
  replacements["TITS"] = replacements["BOOBS"] = "NICHONS"
  replacements["OR"] = "OU BIEN"
  replacements["GTFO"] = "VA LA BAISE DEHORS"
  replacements["FAKE"] = "FAUX"
  replacements["FUCK"] = "BAISE"
  replacements["FAK"] = "BÈZE"
  replacements["CRAP"] = "MERDE"

  for(i in replacements) {
    if(!_hasOwnProperty.call(replacements, i)) continue
    ;(function(i){
      regExps[i] = RegExp("\\b" + i + "\\b", "g")
      replaceMethods[i] = function(){return replacements[i]}
    })(i)
  }

  listener.providesCommand = 'reverseau'

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.util.matchesCommand('reverseau', message)
  }

  listener.callback = function(message, envelope) {
    var str = this.util.removeCommand(message, 'reverseau')

    this.reply(envelope, reverseau.call(this, str))
  }

  function reverseau(param) {
    var str = param.toUpperCase()
    for(i in regExps) str = str.replace(regExps[i], replaceMethods[i])
    return str
  }

})(exports)