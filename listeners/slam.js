;(function(listener) {

  var replacements = {}
    , regExps = {}
    , replaceMethods = {}
    , _hasOwnProperty = {}.hasOwnProperty
    , i

  replacements["OP"] = "LE POSTEUR ORIGINAL"
  replacements["TIL"] = "AUJOURD'HUI J'AI APPRIS QUE"
  replacements["GG"] = "BINE JOUÉ"
  replacements["OR"] = "OU BIEN"
  replacements["IE"] = "AUTREMENT DIT"
  replacements["DTC"] = "DANS TON CUL"
  replacements["DTF"] = "DANS TA FACE"
  replacements["-15"] = "C'EST L'HEURE DU PINARD"
  replacements["PUSH"] = "POUSSE POUSSE"
  replacements["BULLSHIT"] = "CROTTE DE TAUREAU"
  replacements["BRAINSTORMING"] = "TEMPÊTAGE DE CERVEAU"
  replacements["RAGEQUIT"] = "SORT DE LA RAGE"
  replacements["MIAM COCO"] = "QUI AVALE UNE NOIX DE COCO, FAIT CONFIANCE A SON ANUS !"
  replacements["PROUT"] = "SENT L'OEUF"
  replacements["PROUT2"] = "CA COULE, VA CHANGER TON FUT"
  replacements["PROUT3"] = "PUTAIN IL Y EN A PLEIN LES GODASSES"
  replacements["SITNERD"] = "UN INTELLO ASSIS VA MOINS LOIN QU'UN CON QUI MARCHE"
  replacements["ITWORKS"] = "NOM DE ZEUS, MARTY CA MARCHE"

  for(i in replacements) {
    if(!_hasOwnProperty.call(replacements, i)) continue
    ;(function(i){
      regExps[i] = RegExp("\\b" + i + "\\b", "g")
      replaceMethods[i] = function(){return replacements[i]}
    })(i)
  }

  listener.providesCommand = 'slam'

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.util.matchesCommand('slam', message)
  }

  listener.callback = function(message, envelope) {
    var str = this.util.removeCommand(message, 'slam')

    if (str == '--list') {

      this.reply(envelope, "https://github.com/putaindecode/ed-209/blob/master/listeners/slam.js#L9")

    } else if(str == '--random'){

      this.reply(envelope, randomSlam.call(this, replacements)+" "+ randomSlam.call(this, replacements)+" "+randomSlam.call(this, replacements) )
        
    }else{
      this.reply(envelope, slam.call(this, str))
    }
  }

  function randomSlam (obj) {
    var keys = Object.keys(obj)
    return obj[keys[ keys.length * Math.random() << 0]];
  }

  function slam(param) {
    var str = param.toUpperCase()
    for(i in regExps) str = str.replace(regExps[i], replaceMethods[i])
    return str
  }

})(exports)
