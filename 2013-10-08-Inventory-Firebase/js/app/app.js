'use strict';
var Δdb;
var Δitems;
var items = [];

$(document).ready(function(){
  $(document).foundation();
  $('#save').click(save);
  $('#add').click(additem);
  Δdb = new Firebase('https://inventory-pete.firebaseio.com/');
  Δitems = Δdb.child('items');
  Δdb.once('value', receivedDB);   // this function asks firebase for the values
    //it will update and call its function anytime there is a change //it is called
    //once initially
  Δitems.on('child_added',childadded);
  Δitems.on('child_removed',childremoved);
});

function totalCost(){
  var total = 0;
  for(var i =0; i<items.length; i++){
    total += (items[i].value * items[i].amount);
  }
  $('#totalCost').text('$' + total);
}

function receivedDB(snapshot){
    // console.log(snapshot.val()); // this spits out what it has sent you
    console.log('receivedDBData was called');
    var inventory = snapshot.val();
    $('#username').val(inventory.username);
    $('#address').val(inventory.address);
    totalCost();

    //   //looping through an object
    // for(var property in inventory.items){
    //   items.push(inventory.items[property]);//goes through each property in array
    //   //and puts it into the items array
    //   //basically dumps all items in db into our items array
    // }

    // // if(inventory.items){  //condition returns false because there is nothing in items yet
    // //   console.log('Yes there are items');
    // //   items = inventory.items;
    // // } else{
    // //   console.log('No there are no items');
    // //   items = [];
    // // }
    // // console.log(items);
    // // console.log(items.length);
    // // $('#items').children().children('.row').remove();

    // for(var i = 0; i<items.length; i++){
    //   if(items[i]){
    //     buildRow(items[i]);
    //   }
    // }
}

function childadded(snapshot){
  var newitem = snapshot.val();
  items.push(newitem);
  buildRow(newitem);

}

function childremoved(snapshot){//not working
  //can't figure out how to know which item in items array needs to be
  //removed other than comparing its contents one by one
  var rmitem = snapshot.val();
  console.log(rmitem);
  console.log(items);
}

function buildRow(item){
  var row = '<tr><td class="name"></td><td class="amount"></td><td class="value"></td><td class="location"></td><td class="condition"></td><td class="purchaseDate"></td></tr>';
  var $row = $(row);
  $row.addClass('row');
  $row.children('.name').text(item.name);
  $row.children('.amount').text(item.amount);
  $row.children('.value').text('$' + item.value);
  $row.children('.location').text(item.location);
  $row.children('.condition').text(item.condition);
  $row.children('.purchaseDate').text(item.purchaseDate);

  $('#items').append($row);
}

function save(){
  var username = $('#username').val();
  var address = $('#address').val();
  var inventory = {};
  inventory.username = username;
  inventory.address = address;
  // console.log(inventory);
  Δdb.update(inventory); // writes inventory object to db in cloud

}

function additem(){
  var name = $('#name').val();
  var amount = $('#amount').val();
  var value = $('#value').val();
  var location = $('#location').val();
  var condition = $('#condition').val();
  var purchaseDate = $('#purchaseDate').val();

  //this is another way to create a row in table with html directly and put into
  //jquery element and into table

  var item = {};
  item.name = name;
  item.amount = amount;
  item.value = value;
  item.location = location;
  item.condition = condition;
  item.purchaseDate = purchaseDate;

  Δitems.push(item);

  totalCost();
  clearInput();
}

function clearInput(){
  $('#name').val('').focus();
  $('#amount').val('');
  $('#value').val('');
  $('#location').val('');
  $('#condition').val('');
  $('#purchaseDate').val('');
}

