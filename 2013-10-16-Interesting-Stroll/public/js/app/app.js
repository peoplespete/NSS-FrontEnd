'use strict';

// Firebase Schema
var Δdb;

// Local Schema (defined in keys.js)
db.positions = [];
db.favorites = [];

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase(db.keys.firebase);
  Δdb.positions = Δdb.child('positions');
  Δdb.favorites = Δdb.child('favorites');
  initMap(36, -86, 5);
  $('#start').click(clickStart);
  $('#stop').click(clickStop);
  $('#addPlace').click(clickAddPlace);


}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
//CLICK FUNCTIONS
function clickStart(){
  console.log('nice');
}

function clickStop(){
  console.log('to');
}

function clickAddPlace(){
  var placename = getValue('#place');
  console.log(placename + ' you');
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
//DB FUNCTIONS



// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
//HTML FUNCTIONS





// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
function initMap(lat, lng, zoom){
  var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
  db.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function getValue(selector, fn){
  var value = $(selector).val();
  value = value.trim();
  $(selector).val('');

  if(fn){
    value = fn(value);
  }

  return value;
}

function parseUpperCase(string){
  return string.toUpperCase();
}

function parseLowerCase(string){
  return string.toLowerCase();
}

function formatCurrency(number){
  return '$' + number.toFixed(2);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
