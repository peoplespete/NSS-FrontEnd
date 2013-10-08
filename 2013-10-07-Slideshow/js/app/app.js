'use strict';

var photos = [];
var currentIndex = 0;
var timer = 0;
var page = 1;
$(document).ready(function(){
  $(document).foundation();
  $('#search').click(search);

});

function search(){
  var API_KEY = '05d0beefb01185016ed852af3f2c81f7';
  var per_page = 5;
  var query = $('#query').val();
  var url = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + API_KEY + '&text='+ query + '&per_page=' + per_page + '&page=' + page + '&format=json&jsoncallback=?';
  $.getJSON(url, results); //JavaScript Object Notation (JSON)
  //results is a callback function, it fires when data is returned

}

function results(data){
  console.log('data grab' + page);
  photos = data.photos.photo;
  timer = setInterval(createImage,2000);
}

function createImage(){
  var photo = photos[currentIndex];
  currentIndex++;
  // $('#display').empty();
  try{
    var $div = $('<div>');
    var url = "url(http://farm"+ photo.farm +".static.flickr.com/"+ photo.server +"/"+ photo.id +"_"+ photo.secret +"_m.jpg)";
    $div.addClass('photo');
    $div.css('background-image', url);
    $('#display').prepend($div);
    if(currentIndex===photos.length){
      currentIndex = 0;
      page++;
      clearInterval(timer);
      search();
    }
  }
  catch(err){
    currentIndex = 0;
    clearInterval(timer);
    search();
  }
}



