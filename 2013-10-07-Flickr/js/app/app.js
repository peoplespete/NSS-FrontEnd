'use strict';

function search(){
  var API_KEY = '05d0beefb01185016ed852af3f2c81f7';
  var per_page = 10;
  var page = 1;
  var query = $('#query').val();
  var url = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + API_KEY + '&text='+ query + '&per_page=' + per_page + '&page=' + page + '&format=json&jsoncallback=?';
  $.getJSON(url, results); //JavaScript Object Notation (JSON)
  //results is a callback function, it fires when data is returned
}

function results(data){
  // alert('got here');
  for(var i = 0; i<data.photos.photo.length; i++){
    createImage(data.photos.photo[i]);
  }
}

function createImage(photo){
  var $div = $('<div>');
  var url = "url(http://farm"+ photo.farm +".static.flickr.com/"+ photo.server +"/"+ photo.id +"_"+ photo.secret +"_m.jpg)";
  $div.addClass('photo');
  $div.css('background-image', url);
  $('#display').append($div);
}

function removePhoto(){
  $(this).remove();
}

function removeAll(){
  $('#display').children().remove();
}

function choose(){
  $(this).toggleClass('chosen');
}

function save(){
  $('#saved').addClass('saved');
  $('#saved').prepend($('.chosen'));
  $('.chosen').addClass('stored');
  $('.chosen').removeClass('chosen');
}

function removeSelected(){
  $('.chosen').remove();
}


$(document).ready(function(){
  $(document).foundation();
  $('#search').click(search);
  $('#removeAll').click(removeAll);
  $('#removeSelected').click(removeSelected);
  $('#save').click(save);
  $('#display').on('dblclick','div',removePhoto);
  $('#display').on('click','div',choose);
//i'm trying to make it work so that saved ones are small and on hover grow in size

});
