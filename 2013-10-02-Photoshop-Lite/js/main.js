'use strict';

function addcolor(){
  var color = $('#color').val();
  var $box = $('<div>');
  $box.addClass('box');
  $box.css({'background-color':color});
  if($('#colors div').length > 3)
  {
    $('#colors div:last-child').remove();
  }
  $('#colors').prepend($box);
  // alert($('#colors div').length);

  reset();
}

function setcolor(){
  // alert('pallate clicked yo');
  var newcolor = $(this).css('background-color');
  $('#paintcolor').css('background-color',newcolor);
}

function reset(){
  $('#color').val('').focus();
}

function createcanvas(){
  var boxnum = $('#amount').val();
  for(var i = 0; i<boxnum; i++){
    var $box = $('<div>');
    $box.addClass('pixels');
    $('#canvas').prepend($box);
  }
  $('#block2').hide();
  $('#canvas').addClass('border');
}

function paintpixel(){
  var newColor = $('#paintcolor').css('background-color');
  $(this).css('background-color',newColor);
}

$(document).ready(function(){
  $('#addcolor').click(addcolor);
  $('#addboxes').click(createcanvas);
  // $('.box').click(setcolor); the selector is strange maybe wrong
  // $('parentselector').on('name of event','childselector',nameoffunction)
  $('#colors').on('click','.box',setcolor);
  $('#canvas').on('mouseover','.pixels',paintpixel);
});