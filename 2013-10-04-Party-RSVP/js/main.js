'use strict';

function addRow(){
  var $tr = $('<tr>');
  var $tdName = $('<td>');
  $tdName.addClass('name');
  var $tdFood = $('<td>');
  $tdFood.addClass('food');
  var $tdControls = $('<td>');
  $tdControls.addClass('controls');
  $tr.append($tdName,$tdFood,$tdControls);

  var $input = $('<input>');
  $input.attr({'type':'text','placeholder':'bob, paperplates'});
  var $button = $('<input>');
  $button.attr({'type':'button','value':'RSVP'});
  $button.addClass('rsvp');
  $tdControls.append($input, $button);

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

$(document).ready(function(){
  $('#add').click(addRow);
  $('table').on('click', '.rsvp' , rsvp);

});