'use strict';

// Firebase Schema
var Δdb;
var Δpositions;
var Δfavorites;
// Local Schema (defined in keys.js)
db.positions = [];
db.favorites = [];

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase(db.keys.firebase);
  Δpositions = Δdb.child('positions');
  Δfavorites = Δdb.child('favorites');
  initMap(36, -86, 5);
  $('#start').click(clickStart);
  $('#stop').click(clickStop);
  $('#addPlace').click(clickAddPlace);
  Δpositions.on('child_added',dbPositionAdded);

}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
//CLICK FUNCTIONS
function clickStart(){
  var geoOptions = {enableHighAccuracy: true,maximumAge: 1000,timeout: 27000};
  db.watchId = navigator.geolocation.watchPosition(geoSuccess, geoError, geoOptions);

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
function dbPositionAdded(snapshot){
  db.positions.push(snapshot.val());
  if(db.positions.length === 1){
    htmlAddStartIcon();
    htmlDrawLine();
  }


}


// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
//HTML FUNCTIONS
function htmlAddStartIcon(){
  console.log('in htmlAddStartIcon');
  db.startMarker = new google.maps.Marker({map:db.map,position:db.positions[0].latLng,title:'Start',icon:'../../img/Start.png'});
//  db.startMarker.setPosition(db.positions[0].latLng);
}

function htmlDrawLine(){

}


// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
function initMap(lat, lng, zoom){
  var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
  db.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

function geoSuccess(location){
  var position = {};
  console.log(location);
  position.latLng = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
  position.altitude = location.coords.altitude;
  position.time = moment().format();
  Δpositions.push(position);
}

function geoError(){
  console.log('error!!!');
}

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
