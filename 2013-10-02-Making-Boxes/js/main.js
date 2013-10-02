function putclass($box){
  $box.addClass('style'+$('#style').val());
  return $box;
}

$(document).ready(function(){
  $('#maker').click(function(){
    var boxnum = parseInt($('#amount').val());
    for(var i =0; i<boxnum ; i++){
      $box = $('<div>');
      $box = putclass($box);
      $box.text(i);
      $('#boxes').prepend($box);
    }
  });

});