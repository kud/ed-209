exports.fakeimg = function(width, height, text, font) {
  var content = 'http://fakeimg.pl/';

  if(width) { content += width; }
  if(height) { content += 'x' + height; }
  if(text) { content += '/?text=' + encodeURIComponent(text); }
  if(font) { content += '&font=' + encodeURIComponent(font) }

  return  content;
}

