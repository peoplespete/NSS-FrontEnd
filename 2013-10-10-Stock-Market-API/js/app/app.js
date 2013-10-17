'use strict';

//Firebase Schema
var Δdb;
var ΔcashBalance;
var Δstocks;
//Local Schema
var db = {};
db.cashBalance;
db.stocks = [];

$(document).ready(function(){
  $(document).foundation();
  Δdb = new Firebase('https://stocks-pete.firebaseio.com/');
  ΔcashBalance = Δdb.child('cashBalance');
  Δstocks = Δdb.child('stocks');
  $('#setCash').click(setCash);
  $('#buy').click(buy);
  ΔcashBalance.on('value', cashBalanceChanged);
  Δstocks.on('child_added', stockAdded);

});

function stockAdded(snapshot){
  var stock = snapshot.val();
  // db.stocks.push(stock);
  //not getting it down and putting in table quite right
  //make a db.statistics and delta one in firebase too
  /* i'm pushing an array up which is why i have indexing in stocks in firebase.
  might not really be a problem
  he sent us an email explaining how to get key (instead of index) from database.
  he then saved that to the local stock.  (do it by doing snapshot.name();)
  naming dbfunctions should start with db
  clickfuncitons should start with click
  changing html funciton start with html
  he wrote getValue function send selector and function then it takes values out and
  returns value after completing function and emptying the input box
  he made a format currency function that gets sent a float and then uses
  to fixed fncton to get 2 decimal places and then concatenates  the $
  you only need the data parameter when JSONs come back
  you can do deltastocks.push(stock). <==important

  attr can be made up for example $('h1').attr('data-symbol', 'XON');
  can be selected using $('div[data-symbol="'+stock.symbol + '"]');  or
                $(this).data('symbol');


  you can do deltastock = deltastocks.child(stock.key);
  now deltastock.remove() to delete it from firebase

  used _.indexOf to know index of local stock in db to remove with splice(index, 1)

  always clearInterval before setInterval on timers!!!

  you can always get his code on github

    */
  console.log(stock.data.Name);
  addRow(stock);
}

function buy(){
  var symbol = $('#symbol').val();
  getStockQuote(symbol, function(data, status, garbage){
    //stock.data.LastPrice
    var quantity = parseInt($('#quantity').val());
    var stock = {};
    stock.data = data.Data;
    console.log(quantity);
    stock.quantity = quantity;
    console.log(stock);
    db.stocks.push(stock);
    db.cashBalance -= (stock.data.LastPrice * stock.quantity);
    Δstocks.set(db.stocks);
    console.log(stock.data.LastPrice);
    ΔcashBalance.set(db.cashBalance);

    var symbol = $('#symbol').val('').focus();
    var quantity = $('#quantity').val('');

  });
}

function addRow(stock){
  var $tr = $('<tr><td class="name"></td><td class="symbol"></td><td class="quote"></td><td class="shares"></td><td class="total"></td></tr>');
  $tr.children('.name').text(stock.data.Name);
  $tr.children('.symbol').text(stock.data.Symbol);
  $tr.children('.quote').text(stock.data.LastPrice);
  $tr.children('.shares').text(stock.quantity);
  $tr.children('.total').text(stock.data.LastPrice * stock.quantity);
  $('table').append($tr);

}

function cashBalanceChanged(snapshot){
  db.cashBalance = snapshot.val();
  $('#cashBalance').text(db.cashBalance);
}

function setCash(){
  db.cashBalance = parseInt($('#cash').val());
  ΔcashBalance.set(db.cashBalance);
  $('#cash').val('').hide();
  $('#setCash').hide();
}

function getStockQuote(symbol, stockArrived){
  // $.getJSON('url','data you are sending','function');
  var data = {};
  data.symbol = symbol;
  $.getJSON('http://dev.markitondemand.com/Api/Quote/jsonp?callback=?', data, stockArrived);

}

// function stockArrived(quote, textStatus, jqXHR){
//   console.log(quote);
//   console.log(textStatus);
//   console.log(jqXHR);
// }
