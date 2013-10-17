'use strict';

// // Firebase Schema
// var Δdb;

// // Local Schema (defined in keys.js)

$(document).ready(initialize);

function initialize(fn, flag){
  if(!canRun(flag)){return;}
  $(document).foundation();
  // Δdb = new Firebase(db.keys.firebase);
  // initMap(36, -86, 5);
  $('#calculate').click(clickCalculate);
  $('#history').on('click','.remove',clickRemoveRow);
}

function clickCalculate(){
  var op1 = getValue('#op1');
  var op2 = getValue('#op2');
  var operator = getValue('#operator');
  var answer = eval(op1+operator+op2);

  htmlPrintSave(op1,op2,operator,answer);
  $('#op1').focus();
}

function clickRemoveRow(){
  $(this).closest('li').remove();
  colorRows();
}
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //

function htmlPrintSave(op1,op2,operator,answer){
  $('#result').text(answer);
  var $li = $('<li><span class="op1">'+ op1 + '</span><span class="operator">'+ operator + '</span><span class="op2">'+ op2 + '</span>=<span class="result">'+ answer + '</span><input class="remove" type="checkbox">Remove</li>');
  $('#history').prepend($li);
  colorRows();
}
// function initMap(lat, lng, zoom){
//   var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
//   db.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
// }

function colorRows(){
  //for(var i = 0; i<$('#history li').length; i++){
  $('#history li:nth-child(even)').css({'background-color':'rgb(50,200,150)'});
  $('#history li:nth-child(odd)').css({'background-color':'rgb(200,50,150)'});
  console.log($('#history > li:nth-child(odd)').css('background-color'));
}
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //

function getValue(selector, fn){
  var value = $(selector).val();
  value = value.trim();
  $(selector).val('');

  if(fn){
    value = fn(value);
  }

  return value;
}

function canRun(flag){
  var isQunit = $('#qunit').length > 0;
  var isFlag = flag !== undefined;
  var value = isQunit && isFlag || !isQunit;
  return value;
}

// function parseUpperCase(string){
//   return string.toUpperCase();
// }

// function parseLowerCase(string){
//   return string.toLowerCase();
// }

// function formatCurrency(number){
//   return '$' + number.toFixed(2);
// }

// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
