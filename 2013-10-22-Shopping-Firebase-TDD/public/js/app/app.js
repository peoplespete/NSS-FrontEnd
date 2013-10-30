'use strict';

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

// Firebase Schema
var Δdb;
var Δproducts;
var Δcustomers;
var Δpurchases;

// Local Schema (defined in keys.js)
db.products = [];
db.pagination = {};
db.pagination.perPage = 5;
db.pagination.currentPage = 1;
db.customers = [];
db.order = {};
db.order.total = {};
db.order.products = [];
db.purchases = [];


// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

$(document).ready(initialize);

function initialize(fn, flag){
  $(document).foundation();
  initializeDatabase();
  turnHandlersOn();
  htmlShowHideNavigation('#next', false);
  htmlShowHideNavigation('#previous', false);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function initializeDatabase(){
  Δdb = new Firebase(db.keys.firebase);
  Δproducts = Δdb.child('products');
  Δproducts.on('child_added', dbProductAdded);
  Δcustomers = Δdb.child('customers');
  Δcustomers.on('child_added', dbCustomerAdded);
  Δpurchases = Δdb.child('purchases');
  Δpurchases.on('child_added', dbPurchaseAdded);
}

function turnHandlersOn(){
  //$('-selector-').on('-event-', functionName);
  $('#addProduct').on('click', clickAddProduct);
  $('#next').on('click', clickNavigation);
  $('#previous').on('click', clickNavigation);
  $('#addCustomer').on('click',clickAddCustomer);
  $('#products').on('click','.productImage img',clickProductImage);
  $('#selectCustomer').on('change',changeCustomer);
  $('#purchase').on('click',clickPurchase);
}

function turnHandlersOff(){
  //$('-selector-').off('-event-', functionName);
  $('#addProduct').off('click');
  $('#next').off('click');
  $('#previous').off('click');
  $('#addCustomer').off('click');
  $('#products').off('click');
  $('#selectCustomer').off('change');
  $('#purchase').off('click');

}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
function clickPurchase(){
  if(db.order.products.length > 0){
    var customer = db.order.customer;
    var products = [];
    $.each(db.order.products, function(index, p){
      var newP = {};
      newP.name = p.name;
      newP.image = p.image;
      newP.weight = p.weight;
      newP.price = p.price;
      newP.percentOff = p.percentOff;
      newP.salePrice = p.salePrice();
      products.push(newP);
    });

    var total = db.order.total.amount;
    var shipping = db.order.total.shippingCost;
    var grand = db.order.total.grand;
    var order = new Purchase(customer, products, total, shipping, grand);

    Δpurchases.push(order);
    htmlClearOrder();
    htmlDefaultSelectCustomer();
  }
  clearDbOrder();
}


function clickProductImage(){
  if(db.order.customer){
    var name = $(this).closest('td').prev().text();
    var selectedProduct = _.find(db.products, function(p){ return p.name === name});
    db.order.products.push(selectedProduct);
    htmlPutOrder(selectedProduct);
    htmlUpdateOrderTotals();
  }
}

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

function clickNavigation(){
  htmlClearRows();
  var selector = '#' + this.id;
  var notSelector = selector === '#previous' ? '#next' : '#previous';
  var incrementor;
  if(selector === '#previous'){
    incrementor = -1;
  }else{
    incrementor = 1;
  }
  db.pagination.currentPage += incrementor;
  htmlPutRows(db.pagination.currentPage);
  var checkEnds = selector === '#previous' ? db.pagination.currentPage === 1 : $('table#products tr:not(.header)').length < db.pagination.perPage;
  if(checkEnds){
    htmlShowHideNavigation(selector, false);
  }
  htmlShowHideNavigation(notSelector , true);
}

function clickAddCustomer(){
  var name = getValue('#customerName');
  var image = getValue('#customerImage');
  var isDomestic = $('#isDomestic').is(':checked');
  var customer = new Customer(name, image, isDomestic);
  Δcustomers.push(customer);
  clearDomesticInternational();
}


// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
function dbPurchaseAdded(snapshot){
  var rdr = snapshot.val();
  var customer = rdr.customer;
  var products = rdr.products;
  var total = rdr.total;
  var shipping = rdr.shipping;
  var grand = rdr.grand;
  var order = new Purchase(customer, products, total, shipping, grand)
  order.id = snapshot.name();
  db.purchases.push(order);
  htmlPutPurchase(order);

}

function dbProductAdded(snapshot){
  var prdct = snapshot.val();
  var product = new Product(prdct.name,prdct.image,prdct.weight,prdct.price,prdct.percentOff);
  product.id = snapshot.name();
  db.products.push(product);
  if(db.products.length <= db.pagination.perPage){
    htmlPutProduct(product);
  }
  else{
    htmlShowHideNavigation('#next' ,true);
  }
}

function dbCustomerAdded(snapshot){
 var cstmr = snapshot.val();
 var customer = new Customer(cstmr.name, cstmr.image, cstmr.isDomestic);
 customer.id = snapshot.name();
 db.customers.push(customer);
 htmlAddToCustomerDropDown(customer);

}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
function  htmlClearOrder(){
  $('#order tbody tr').remove();
  $('#order tfoot tr td').text('');
}

function htmlDefaultSelectCustomer(){
  $('#selectCustomer').val('default');
}

function htmlPutPurchase(order){
  var $tr = $('<tr><td class = "purchaseId">'+order.id+'</td><td class = "purchaseTime">'+order.time+'</td><td class = "purchaseCustomer">'+order.customer.name+'</td><td class = "purchaseProducts"><ol class = "purchaseProductsList"></ol></td><td class = "purchaseTotal">'+order.total+'</td><td class = "purchaseShipping">'+order.shipping+'</td><td class = "purchaseGrand">'+order.grand+'</td></tr>');
  $.each(order.products, function(index, p){
    var $li = $('<li>'+p.name+'</li>');
    $tr.children('.purchaseProducts').children('.purchaseProductsList').append($li);
  });
  $('#purchases tbody').prepend($tr);

  //make it a product object again in db
}

function htmlAddToCustomerDropDown(customer){
  var $option = $('<option>');
  $option.val(customer.name);
  $option.text(customer.name);
  $('select#selectCustomer').prepend($option);
}

function htmlPutOrder(selectedProduct){
  var alreadyThere = false;
  var quantity = 1;
  var $tr;
  $.each($('#order tbody tr'), function( index, tr) {
    if($(tr).children('td.productName').text() === selectedProduct.name){
      $tr = $(tr);
      alreadyThere = true;
      quantity = parseInt($tr.children('td.productQuantity').text()) + 1;
    }
  });
  var shipRate = db.order.customer.isDomestic ? 0.5 : 1.5;
  var amount = quantity * selectedProduct.salePrice();
  var weight = quantity * selectedProduct.weight;
  var shippingCost = quantity * selectedProduct.weight * shipRate;
  var total = amount + shippingCost;
  if(alreadyThere){
    $tr.children('td.productQuantity').text(quantity);
    $tr.children('td.productAmount').text(amount);
    $tr.children('td.productWeight').text(weight);
    $tr.children('td.productShippingCost').text(shippingCost);
    $tr.children('td.productTotal').text(total);
  }
  else{
    var $tr = $('<tr><td class="productName">'+selectedProduct.name+'</td><td class="productQuantity">'+quantity+'</td><td class="productAmount">'+amount+'</td><td class="productWeight">'+weight+'</td><td class="productShippingCost">'+shippingCost+'</td><td class="productTotal">'+total+'</td></tr>');
    $('#order tbody').append($tr);
  }
}

function htmlUpdateOrderTotals(){
  db.order.total.quantity = 0;
  db.order.total.amount = 0;
  db.order.total.weight = 0;
  db.order.total.shippingCost = 0;
  db.order.total.grand = 0;
  $.each($('#order tbody tr'), function( index, tr) {
    var $tr = $(tr);
    db.order.total.quantity += parseInt($tr.children('.productQuantity').text());
    db.order.total.amount += parseFloat($tr.children('.productAmount').text());
    db.order.total.weight += parseFloat($tr.children('.productWeight').text());
    db.order.total.shippingCost += parseFloat($tr.children('.productShippingCost').text());
    db.order.total.grand += parseFloat($tr.children('.productTotal').text());
  });
//put totals to table#order
  $('#order tfoot td:nth-child(2)').text(db.order.total.quantity);
  $('#order tfoot td:nth-child(3)').text(db.order.total.amount);
  $('#order tfoot td:nth-child(4)').text(db.order.total.weight);
  $('#order tfoot td:nth-child(5)').text(db.order.total.shippingCost);
  $('#order tfoot td:nth-child(6)').text(db.order.total.grand);

}

function htmlPutProduct(product){
  var $img = $('<img>');
  $img.attr('src','img/'+product.image);
  var $tr = $('<tr><td class="productName">'+product.name+'</td><td class="productImage"></td><td class="productWeight">'+product.weight+'</td><td class="productPrice">'+product.price+'</td><td class="productPercentOff">'+product.percentOff+'</td><td class="productSalePrice">'+product.salePrice()+'</td></tr>');
  $tr.children('.productImage').append($img);
  $('table#products tbody').append($tr);
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

function htmlShowHideNavigation(selector, show){
  $(selector).addClass('hidden');
  if(show){
    $(selector).removeClass('hidden');
  }
}
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
//CLASS CONSTRUCTORS

function Product(name, image, weight, price, percentOff){
  var save = this;
  this.name = name;
  this.image = image;
  this.weight = weight;
  this.price = price;
  this.percentOff = percentOff;
  this.salePrice = function(){
    return (save.price * (1-(save.percentOff/100)));
  };
}

function Customer(name, image, isDomestic){
  this.name = name;
  this.image = image;
  this.isDomestic = isDomestic;
}

function Purchase(customer, products, total, shipping, grand){
  this.id;
  this.time = moment().format('MMMM Do YYYY, h:mm:ss a');
  this.customer = customer;
  this.products = products;
  this.total = total;
  this.shipping = shipping;
  this.grand = grand;
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
function clearDbOrder(){
  db.order.customer = {};
  db.order.products = [];
  db.order.total = {};
}


function changeCustomer(){
  var name = this.value;
  var customer = _.find(db.customers, function(c){return c.name === name;});
  db.order.customer = customer;
}

function clearDomesticInternational(){
  $('#domesticInternational input:checked')[0].checked = false;
}

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
// function clickPrevious(){
//   htmlClearRows();
//   db.pagination.currentPage--;
//   htmlPutRows(db.pagination.currentPage);
//   if(db.pagination.currentPage === 1){
//     htmlHidePrevious();
//   }
//   htmlShowNext();
// }
// function clickNext(){
//   htmlClearRows();
//   db.pagination.currentPage++;
//   htmlPutRows(db.pagination.currentPage);
//   if($('table#products tr:not(.header)').length < db.pagination.perPage){
//     htmlHideNext();
//   }
//   htmlShowPrevious();
// }

// -------------------------------------------------------------------- //

// function htmlShowNext(){
//   $('#next').removeClass('hidden');
// }
// function htmlHideNext(){
//   $('#next').addClass('hidden');
// }
// function htmlShowPrevious(){
//   $('#previous').removeClass('hidden');
// }
// function htmlHidePrevious(){
//   $('#previous').addClass('hidden');
// }
// -------------------------------------------------------------------- //
