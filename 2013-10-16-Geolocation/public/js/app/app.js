'use strict';

// Firebase Schema
var Δdb;
var Δpositions;

// Local Schema (defined in keys.js)
db.positions = [];
db.path = [];

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase(db.keys.firebase);
  Δpositions = Δdb.child('positions');
  Δpositions.on('child_added',dbPositionAdded);
  initMap(36, -86, 5);
  $('#start').click(clickStart);
  $('#erase').click(clickErase);
  Δpositions.remove();
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function clickErase(){
  Δpositions.remove();
  db.positions = [];
  db.path = [];
}

function clickStart(){
  var geoOptions = {enableHighAccuracy: true,maximumAge: 1000,timeout: 27000};
  db.watchId = navigator.geolocation.watchPosition(geoSuccess, geoError, geoOptions);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function dbPositionAdded(snapshot){
  var position = snapshot.val();
  $('#debug').text(position.time);
  var latLng = new google.maps.LatLng(position.latitude, position.longitude);
  db.positions.push(position);
  console.log(position);
  if(db.positions.length === 1){
    //add marker
    htmlAddStartIcon(latLng);
    //draw line from position to db.positions[db.positions.length - 1]
    htmlDrawLine();
  }
  db.path.push(latLng);
}


// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
function htmlDrawLine(){
  var path = new google.maps.Polyline({
    map: db.map,
    geodesic: true,
    strokeColor: '#FFBB00',
    strokeOpacity: 1,
    strokeWeight: 3
  });
  db.path = path.getPath();
}

function htmlAddStartIcon(latLng){
  var marker = new google.maps.Marker({map:db.map,position:latLng,title:'Start',icon:'../../img/Start.png'});
  htmlCenterZoom(latLng);
}

function htmlCenterZoom(latLng){
  db.map.setCenter(latLng);
  db.map.setZoom(15);
}
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function initMap(lat, lng, zoom){
  var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.TERRAIN};
  db.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

function geoSuccess(location) {
  var position = {};
  position.latitude = location.coords.latitude;
  position.longitude = location.coords.longitude;
  position.altitude = location.coords.altitude || 0; //if it doesn't give you altitude make it 0
  position.time = moment().format('MMMM Do YYYY, h:mm:ss a');
  Δpositions.push(position);
}

function geoError() {
  console.log('Sorry, no position available.');
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function getValue(selector, fn){
  var value = $(selector).val();
  value = value.trim();  // this removes whitespace accidentally inputed by user
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
