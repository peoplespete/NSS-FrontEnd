'use strict';
var timer;
$(document).ready(function(){
  $(document).foundation();

  $('#start').click(start);
  $('#stop').click(stop);
});

function start(){
  $('#start').addClass('disabled');
  $('#start').attr('disabled',true);
  var delay = parseInt($('#delay').val()*1000);
  timer = setInterval(putbox,delay);
}

function stop(){
  clearInterval(timer);
  $('#colors').empty();
  $('#start').removeClass('disabled');
  $('#start').attr('disabled',false);
  $('#dimension').val('').focus();
  $('#delay').val('');

}

function putbox(){
  var $div = $('<div>');
  $div.addClass('color');
  var sidesize = parseInt($('#dimension').val());
  var bgcolor = colorMaker();
  $div.css({'background-color':bgcolor,'height':sidesize,'width':sidesize});
  $('#colors').prepend($div);
}

function colorMaker(){
  var opacity = Math.random()
  // console.log('opacity:'+opacity);
  var rn2 = (opacity *1000) - Math.floor(opacity *1000);
  // console.log('rn2:'+rn2);
  var amount = Math.round(rn2*255);
  var red;
  var green;
  if(isEven(amount)){
    red = amount;
    green = 0;
  }else{
    red = 0;
    green = amount;
  }
  return 'rgba(' + red + ',' + green + ',' + 0+ ',' + opacity+')';
  return 'rgb(' + red + ',' + green + ',' + 0 + ')';

}

function isEven(num){
  if(num%2===0)
    return true;
  return false;
}