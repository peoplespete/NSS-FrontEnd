'use strict';

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

// Firebase Schema
var Δdb;
var Δproducts;
// Local Schema (defined in keys.js)
db.products = [];
db.pagination = {};
db.pagination.perPage = 5;
db.pagination.currentPage = 1;

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

$(document).ready(initialize);

function initialize(fn, flag){
  $(document).foundation();
  initializeDatabase();
  turnHandlersOn();
  htmlHideNext();
  htmlHidePrevious();
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function initializeDatabase(){
  Δdb = new Firebase(db.keys.firebase);
  Δproducts = Δdb.child('products');
  Δproducts.on('child_added', dbProductAdded);

}

function turnHandlersOn(){
  //$('-selector-').on('-event-', functionName);
  $('#addProduct').on('click', clickAddProduct);
  $('#next').on('click', clickNext);
  $('#previous').on('click', clickPrevious);

}

function turnHandlersOff(){
  //$('-selector-').off('-event-', functionName);
  $('#addProduct').off('click');
  $('#next').off('click');
  $('#previous').off('click');

}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function clickAddProduct(){
  var name = getValue('#productName');
  var image = getValue('#productImage');
  var weight = getValue('#productWeight',parseFloat);
  var price = getValue('#productPrice',parseFloat);
  var percentOff = getValue('#productPercentOff',parseFloat);
  var product = new Product(name, image, weight, price, percentOff);

  delete product.salePrice;
  Δproducts.push(product);
}

function clickNext(){
  htmlClearRows();
  db.pagination.currentPage++;
  htmlPutRows(db.pagination.currentPage);
  if($('table#products tr:not(.header)').length < db.pagination.perPage){
    htmlHideNext();
  }
  htmlShowPrevious();
}

function clickPrevious(){
  htmlClearRows();
  db.pagination.currentPage--;
  htmlPutRows(db.pagination.currentPage);
  if(db.pagination.currentPage === 1){
    htmlHidePrevious();
  }
  htmlShowNext();
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
function dbProductAdded(snapshot){
  var prdct = snapshot.val();
  var product = new Product(prdct.name,prdct.image,prdct.weight,prdct.price,prdct.percentOff);
  product.id = snapshot.name();
  db.products.push(product);
  console.log(db.products.length);
  if(db.products.length <= db.pagination.perPage){
    htmlPutProduct(product);
  }
  else{
    htmlShowNext();
  }
}



// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
function htmlPutProduct(product){
  var $imgtag = $('<img>');
  $imgtag.attr('src',product.image);
  var $tr = $('<tr><td class="productName">'+product.name+'</td><td class="productImage">'+$imgtag+'</td><td class="productWeight">'+product.weight+'</td><td class="productPrice">'+product.price+'</td><td class="productPercentOff">'+product.percentOff+'</td><td class="productSalePrice">'+product.salePrice()+'</td></tr>');
  $tr.children('.productImage').append($imgtag);
  $('table#products').append($tr);
}

function htmlClearRows(){
  $('table#products tr:not(.header)').remove();
}

function htmlPutRows(page){
  page -=1;
  for(var i  = page * db.pagination.perPage; i < ((page * db.pagination.perPage) + db.pagination.perPage ); i++){
    if(db.products[i]){
      htmlPutProduct(db.products[i]);
    }
  }
}

function htmlShowNext(){
  $('#next').removeClass('hidden');
}

function htmlHideNext(){
  $('#next').addClass('hidden');
}

function htmlShowPrevious(){
  $('#previous').removeClass('hidden');
}

function htmlHidePrevious(){
  $('#previous').addClass('hidden');
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
//CLASS CONSTRUCTORS

function Product(name, image, weight, price, percentOff){
  this.name = name;
  this.image = image;
  this.weight = weight;
  this.price = price;
  this.percentOff = percentOff;
  this.salePrice = function(){
    return (this.price * (1-(this.percentOff/100)));
  };
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //




function getValue(selector, fn){
  var value = $(selector).val();
  value = value.trim();
  $(selector).val('');

  if(fn){
    value = fn(value);
  }
  if(!value){
    value = 0;
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
