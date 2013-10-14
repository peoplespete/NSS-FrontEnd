'use strict';

// Firebase Schema
var Δdb;
var Δlocations;

// Local Schema
var db = {};
db.locations = [];
db.map = null;

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase('https://vacation-pete.firebaseio.com/');
  Δlocations = Δdb.child('locations');
  Δlocations.on('child_added',dbLocationAdded);
  initMap(36, -86, 5);
  $('#setZoom').click(clickSetZoom);
  $('#addLocation').click(clickAddLocation);
  $('#showLocation').click(clickShowLocation);

}

function clickShowLocation(){
  var name = $('#selectLocation').val();
  var location = _.find(db.locations,  function(loc){ return loc.name === name; });
  console.log(location);
  var latLng = new google.maps.LatLng(location.coordinates.lb, location.coordinates.mb);
  db.map.setZoom(8);
  db.map.setCenter(latLng);
  //var mapOptions = {center: new google.maps.LatLng(location.coordinates.lb, location.coordinates.mb), zoom: 5, mapTypeId: google.maps.MapTypeId.ROADMAP};
  //db.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

}

function clickAddLocation(){
  var name = getValue('#location');
  var geocoder = new  google.maps.Geocoder();
  geocoder.geocode({ address: name}, function(results, status){
    var location = {};
    location.name =  results[0].formatted_address;
    location.coordinates = results[0].geometry.location;
    console.log(location);
    Δlocations.push(location);
  });
}

function clickSetZoom(){
  var zoom = getValue('#zoom', parseInt);
  db.map.setZoom(zoom);
}

function dbLocationAdded(snapshot){
  var location = snapshot.val();
  db.locations.push(location);
  htmlAddLocation(location);
  htmlAddMarker(location);
}

function htmlAddMarker(location){
  var latLng = new google.maps.LatLng(location.coordinates.lb, location.coordinates.mb);
  var marker = new google.maps.Marker({map:db.map,position:latLng});

}

function htmlAddLocation(location){
  var $option = $('<option>');
  $option.val(location.name);
  $option.text(location.name);
  $('#selectLocation').append($option);

}

function initMap(lat, lng, zoom){
  var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
  db.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

function getValue(selector, fn){
  var value = $(selector).val();
  $(selector).val('');
  if(fn){
    value = fn(value);
  }
  return value;
}
