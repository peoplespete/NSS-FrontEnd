function clearinput(){
    $('#colorstring').val('').focus();
    $('#boxes').empty();
  }

$(document).ready(function(){

  clearinput();
  $('#colorbutton').click(function(){
    $('#boxes').empty();
    var colorstring = $('#colorstring').val();
    var colors = colorstring.split(', ');
    for(var i =0; i<colors.length; i++){
      var $box = $('<div>');
      $box.addClass('box');
      $box.text(colors[i]);
      $box.css('background-color',colors[i]);
      $('#boxes').append($box);
    }
  });

  $('#clearbutton').click(clearinput);

});