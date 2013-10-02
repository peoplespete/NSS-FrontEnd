function piglatinize(sentence){
  var words = sentence.split(' ');
  for(var i = 0; i < words.length; i++)
    words[i] = pigit(words[i]);
  return words.join(' ');
}

function pigit(word){
  if(is_vowel(word[0]))
    return word + 'way';
  var frontchunk = [];
  for(var i =0; i<word.length;i++){
    if(is_vowel(word[i]))
      break;
    frontchunk.push(word[i]);
  }
  var fchunk = frontchunk.join("");
  return word.slice(fchunk.length) + fchunk + 'a';
}

function is_vowel(letter){
  letter = letter.toLowerCase();
  if(letter == 'a' || letter == 'e' || letter == 'i' || letter == 'o' || letter == 'u')
    return true;
  return false;
}

$(document).ready(function(){
  $('#pig').click(function(){
    $('#ordwa').val(piglatinize($('#word').val()));
  });

});