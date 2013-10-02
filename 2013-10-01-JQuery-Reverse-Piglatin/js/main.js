function piglatinize(word){
  return word.slice(1) + word[0] + 'a';
}

function piggythem(words){
  for(var i=0; i<words.length; i++)
      words[i] = piglatinize(words[i]);
  return words;
}

$(document).ready(function(){
  $('#submit').click(function(){
    var words = $('#input').val().split(', ').reverse();
    words = piggythem(words);
    $('#output').val(words.join('; '));
  });


});