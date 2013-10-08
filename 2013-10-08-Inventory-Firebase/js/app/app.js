'use strict';

$(document).ready(function(){
  $(document).foundation();
  $('#add').click(additem);
});

function additem(){
  var name = $('#name').val();
  var amount = $('#amount').val();
  var value = $('#value').val();
  var location = $('#location').val();
  var condition = $('#condition').val();
  var purchaseDate = $('#purchaseDate').val();


  //this is another way to create a row in table with html directly and put into
  //jquery element and into table
  var row = '<tr><td class="name"></td><td class="amount"></td><td class="value"></td><td class="location"></td><td class="condition"></td><td class="purchaseDate"></td></tr>';
  var $row = $(row);

  $row.children('.name').text(name);
  $row.children('.amount').text(amount);
  $row.children('.value').text(value);
  $row.children('.location').text(location);
  $row.children('.condition').text(condition);
  $row.children('.purchaseDate').text(purchaseDate);

  $('#items').append($row);
  clearInput();
}

function clearInput(){
  var name = $('#name').val('').focus();
  var amount = $('#amount').val('');
  var value = $('#value').val('');
  var location = $('#location').val('');
  var condition = $('#condition').val('');
  var purchaseDate = $('#purchaseDate').val('');
}