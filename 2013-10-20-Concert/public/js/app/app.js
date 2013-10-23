'use strict';
var concert = {};

$(document).ready(initialize);

function initialize(fn, flag){
  if(!canRun(flag)){return;}
  $(document).foundation();
  $('#createSeats').click(clickCreateSeats);
  $('#vip').on('dblclick','div', dblclickReserve);
  $('#general').on('dblclick','div', dblclickReserve);


}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
function dblclickReserve(){
  var name = $('#name').val();
  if(name === '') {return;}
  console.log($(this));
  if(!$(this).hasClass('reserved')) {
    $(this).addClass('reserved');
    $(this).text(name);
  }
  updateReporting();

}

function clickCreateSeats(){
    var seatNum = getValue('#seatNum',parseInt);
    var section = $('#section').val();
    putSeats(section, seatNum);
}

function updateReporting(){
  var vipSeatList = _.map($('#vip div'),function(div){
    return $(div).text();
  });
  var vipSeatNumbers = _.map($('#vip div'),function(div){
    if(isNAN(parseInt($(div).text())){
      var number = parseInt($(div).before().text());
      return number+1;
    }
  });
}

function putSeats(section, seatNum){
  if(section==='vip'){
    //vip
    concert.vipCost = getValue('#seatCost',parseFloat);
    htmlAddSeats('#vip',seatNum);
    $('#section option[value="vip"]').remove();

  }else{
    //ga
    concert.gaCost = getValue('#seatCost',parseFloat);
    htmlAddSeats('#general',seatNum);
    $('#section option[value="ga"]').remove();
  }

  if($('#vip div').length > 0 && $('#general div').length > 0) {
    $('#left .row:nth-child(2)').remove();
  }
}

function htmlAddSeats(selector,seatNum){
  for(var i = 0; i<seatNum; i++){
    var $seat = $('<div>');
    $seat.text(i+1);
    $(selector).append($seat);
  }
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

function formatCurrency(number){
  return '$' + number.toFixed(2);
}


function canRun(flag){
  var isQunit = $('#qunit').length > 0;
  var isFlag = flag !== undefined;
  var value = isQunit && isFlag || !isQunit;
  return value;
}