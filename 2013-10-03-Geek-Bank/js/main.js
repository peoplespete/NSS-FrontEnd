'use strict';

var balanceamount = 0;

function deposit(){
    var amount = parseFloat($('#amount').val());
    if (isNaN(amount)){
      amount = 0;
    }
    balanceamount += amount;
    $('#balancedisplay').text('$' + balanceamount);
    $('#amount').val('').focus();
    if(balanceamount>=0){
      $('#balancedisplay').removeClass('broke');
    }
    var depositstring = '$' + amount;
    var $deposit = $('<li>' + depositstring + '</li>');
    $('#depositlist').append($deposit);
}

function withdraw(){
    var amount = parseFloat($('#amount').val());
    if (isNaN(amount)){
      amount = 0;
    }
    balanceamount -= amount;
    $('#balancedisplay').text('$' + balanceamount);
    $('#amount').val('').focus();
    if(balanceamount<0){
      $('#balancedisplay').addClass('broke');
    }
    var withdrawlstring = '$' + amount;
    var $withdrawl = $('<li>' + withdrawlstring + '</li>');
    $('#withdrawllist').append($withdrawl);
  }

$(document).ready(function(){

  $('#setlogo').click(function(){
    var url = $('#url').val();
    $('#logopic').attr('src',url);
    $('#url').val('');
    $('#logo > input').hide();
    $('#balanceamount').focus();
  });

  $('#setbalance').click(function(){
    balanceamount = parseFloat($('#balanceamount').val());
    $('#balancedisplay').text('$' + balanceamount);
    $('#balance > input').hide();
    $('#amount').focus();
  });

  $('#deposit').click(deposit);

  $('#withdraw').click(withdraw);

  $('#depositlist').on('click','li',function(){
    var amount = parseInt($(this).text().slice(1));
    $(this).remove();
    balanceamount -= amount;
    $('#balancedisplay').text('$' + balanceamount);
    if(balanceamount<0){
      $('#balancedisplay').addClass('broke');
    }
  });

  $('#withdrawllist').on('click','li',function(){
    var amount = parseInt($(this).text().slice(1));
    $(this).remove();
    balanceamount += amount;
    $('#balancedisplay').text('$' + balanceamount);
    if(balanceamount>=0){
      $('#balancedisplay').removeClass('broke');
    }
  });

});