'use strict';

function addRow(){
  var $tr = $('<tr>');
  var $tdName = $('<td>');
  $tdName.addClass('name');
  var $tdFood = $('<td>');
  $tdFood.addClass('food');
  var $tdControls = $('<td>');
  $tdControls.addClass('controls');
  var $tdDelete = $('<td>');



  var $input = $('<input>');
  $input.attr({'type':'text','placeholder':'bob, paperplates'});
  var $button = $('<input>');
  $button.attr({'type':'button','value':'RSVP'});
  $button.addClass('rsvp');
  $tdControls.append($input, $button);

  var $nuke = $('<input>');
  $nuke.attr({'type':'button','value':'Delete Row'});
  $nuke.addClass('nuke');
  $tdDelete.append($nuke);

  var $tdMove = $('<td>');
  var $up = $('<img>');
  $up.attr('src','images/up.png');
  $up.addClass('up');
  var $down = $('<img>');
  $down.attr('src','images/down.png');
  $down.addClass('down');


  $tdMove.append($up, $down);


  $tr.append($tdName,$tdFood,$tdControls, $tdDelete, $tdMove);
  $('table').append($tr);
  $input.focus();

}

function rsvp(){
  var input = $(this).prev().val();
  $(this).prev().val('').focus();
  var inputs = input.split(', ');
  var name = inputs[0];
  var food = inputs[1];
  $(this).parent().prev().prev().text(name);
  $(this).parent().prev().text(food);
}

function nuke(){
  $(this).parent().parent().remove();
}

function move(){
  var cls = $(this).attr('class');
  var $moveme = $(this).closest('tr');

  if(cls === 'up'  && $moveme.prev().children('th').length === 0){
    $moveme.prev().before($moveme);
  }else if(cls === 'down' ){
    $moveme.next().after($moveme);
  }
}

$(document).ready(function(){
  $('#add').click(addRow);
  $('table').on('click', '.rsvp' , rsvp);
  $('table').on('click', '.nuke', nuke);
  $('table').on('click','.up, .down', move)
});