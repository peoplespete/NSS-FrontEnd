var balance = 1000;

function deposit(amount, balance){
  balance += amount;
  return balance;
}

function withdrawl(amount, balance){
  balance -= amount;
  return balance;
}

$(document).ready(function(){
  $('#balance').text('$'+balance);

  $('#deposit').click(function(){
    balance = deposit(parseFloat($('#amount').val()),balance);
    $('#balance').text('$'+ balance);

    if(balance>0)
      $('#balance').removeClass('broke');

  });

  $('#withdrawl').click(function(){
    balance = withdrawl(parseFloat($('#amount').val()),balance);
    $('#balance').text('$'+ balance);

    if(balance<0)
      $('#balance').addClass('broke');

  });




});