'use strict';

module('Integration Testing', {setup: setupTest, teardown: teardownTest});

function setupTest(){
  turnHandlersOff();
  turnHandlersOn();
  // Reset Global Variables Here
  db.products = [];
  db.customers = [];
  db.purchases = [];
  db.order = {};
  db.order.total = {};
  db.order.products = [];
  db.pagination.currentPage = 1;
  // Clean Out Test Database Here
  Δdb.remove();
}

function teardownTest(){
}

test('Add Product', function(){
  expect(12);

  $('#productImage').val('windows-surface.png');
  $('#productName').val('Windows Surface');
  $('#productWeight').val('1.3');
  $('#productPrice').val('329.00');
  $('#productPercentOff').val('10');
  $('#addProduct').trigger('click');

  equal(db.products.length,1,'checks that local products array has 1 element');
  ok(db.products[0].id,'checks that there is an id for the product');
  equal(db.products[0].image,'windows-surface.png','checks that image is added to product');
  equal(db.products[0].name,'Windows Surface','checks that name is added to product');
  equal(db.products[0].weight,1.3,'checks that weight is added to product');
  QUnit.close(db.products[0].salePrice(),296.1,1,'checks that salePrice product function works');
  ok(db.products[0] instanceof Product, 'checks that product added is a product object');

  equal($('#products tr').length,2,'checks that table of products has 2 rows');
  equal($('#products tbody tr:nth-child(1) td').length,6,'checks that table rows have 6 cells');
  equal($('#products .productName').text(),'Windows Surface','this checks product name in table');
  QUnit.close(parseFloat($('#products .productSalePrice').text()),296.10,1,'checks that products salePrice was displayed in table');
  equal($('#products .productImage img').attr('src'),'img/windows-surface.png','checks that products salePrice was displayed in table');


  // equal('actual-result', 'expected-result', 'description of assertion'); //for comparing simple numbers or strings
  // ok('result-that-is-true-or-false', 'description of assertion');
  // deepEqual('actual-result', 'expected-result', 'description of assertion'); //for complicated objects/arrays
});

test('Product Pagination', function(){
  expect(18);

  for(var i = 0; i < 12; i++){
    var name = Math.random().toString(36).substring(2); //substring removes the 0 and .
    var image = Math.random().toString(36).substring(2) + '.png'; //substring removes the 0 and .
    var weight = Math.random() * 100;
    var price = Math.random() * 1000;
    var percentOff = Math.random() * 100;

    createTestProduct(name, image, weight, price, percentOff);
  }

  equal(db.products.length,12,'making sure that 12 products were added to local db');
  equal(db.pagination.perPage, 5, 'should be 5 products per page');
  equal(db.pagination.currentPage, 1, 'should be on first page');
  equal($('table#products tr').length, 6, 'table should have 5 products and header');
  equal($('#previous.hidden').length,1,'previous button should be hidden');
  equal($('#next:not(.hidden)').length,1,'next button should not be hidden');

  $('#next').trigger('click');

  equal(db.pagination.currentPage, 2, 'should be on second page');
  equal($('table#products tbody tr').length, 5, 'table should have 5 products');
  equal($('#previous:not(.hidden)').length,1,'previous button should not be hidden');
  equal($('#next:not(.hidden)').length,1,'next button should not be hidden');

  $('#next').trigger('click');

  equal(db.pagination.currentPage, 3, 'should be on third page');
  equal($('table#products tbody tr').length, 2, 'table should have 2 products');
  equal($('#previous:not(.hidden)').length,1,'previous button should not be hidden');
  equal($('#next.hidden').length,1,'next button should be hidden');

  $('#previous').trigger('click');
  $('#previous').trigger('click');

  equal(db.pagination.currentPage, 1, 'should be on first page');
  equal($('table#products tbody tr').length, 5, 'table should have 5 products ');
  ok($('#previous').hasClass('hidden'),'previous button should be hidden');
  ok(!$('#next').hasClass('hidden'), 'next button should not be hidden');
});

function createTestProduct(name, image, weight, price, percentOff){
  $('#productName').val(name);
  $('#productImage').val(image);
  $('#productWeight').val(weight);
  $('#productPrice').val(price);
  $('#productPercentOff').val(percentOff);
  $('#addProduct').trigger('click');
}


test('Add Customer', function(){
  expect(7);
  $('#customerImage').val('bob.png');
  $('#customerName').val('Bob Jenkins');
  $('#isDomestic')[0].checked = true;
  $('#addCustomer').trigger('click');

  equal(db.customers.length,1,'should have 1 customer in array');
  ok(db.customers[0] instanceof Customer,'should be an instanceof Customer');
  ok(!$('#isDomestic')[0].checked, 'domestic should not be checked');
  equal(db.customers[0].name,'Bob Jenkins','name should be present');
  equal(db.customers[0].image,'bob.png','image should be present');
  ok(db.customers[0].id, 'id should be present');
  ok(db.customers[0].isDomestic, 'should be domestic');

});

test('Cutomer Dropdown and Shopping Cart', function(){
  //expect(7);

  for(var i = 0; i < 5; i++){
    var name = Math.random().toString(36).substring(2); //substring removes the 0 and .
    var image = Math.random().toString(36).substring(2) + '.png'; //substring removes the 0 and .
    var isDomestic = _.shuffle([true, false])[0];
    createTestCustomer(name, image, isDomestic);
  }

  createTestCustomer('Bob','bob.png',true);

  equal(db.customers.length, 6, '6 customers were created');
  equal($('select#selectCustomer option').length,7,'customers are populating the drop down');
  equal($('select#selectCustomer option:nth-child(1)').val(),'Bob','make sure bob is in drop down');
  equal($('select#selectCustomer option:nth-child(1)').text(),'Bob','make sure bob is in drop down');
  ok($('table#order').length,'shopping cart should be visible');
  equal($('table#order th').length, 6, 'shopping cart should have 6 columns');
  ok($('#purchase').length,'purchase button should be visible');
});


function createTestCustomer(name, image, isDomestic){
  $('#customerName').val(name);
  $('#customerImage').val(image);
  if(isDomestic){
    $('#isDomestic')[0].checked = true;
  } else{
    $('#isInternational')[0].checked = true;
  }
  $('#addCustomer').trigger('click');
}


test('Add Items to Shopping Cart', function(){
  expect(19);

  createTestProduct('windows-surface','windows-surface.png',1,800,50);//sale price 400
  createTestProduct('tire','tire.png',0.5,200,0);//sale price 200
  createTestProduct('basketball','basketball.png',6.6,30,20);//sale price 24
  createTestCustomer('Bob','bob.png',true);
  createTestCustomer('Sally','sally.png',false);
//2 tires added and a basketball to cart
  $('select#selectCustomer').val('Sally');
  $('select#selectCustomer').trigger('change');

  $('#products tbody tr:nth-child(2) .productImage img').trigger('click');
  $('#products tbody tr:nth-child(2) .productImage img').trigger('click');
  $('#products tbody tr:nth-child(3) .productImage img').trigger('click');

  equal(db.order.customer.name,'Sally','checks that order has orderer as sally');
  ok(db.order.customer instanceof Customer,'is first product in order a Product');

  equal(db.order.products.length,3,'checks that there are 3 items in this order');
  ok(db.order.products[0] instanceof Product,'is first product in order a Product');
  equal(db.order.total.quantity, 3, 'should have chosen 3 itesm');
  equal(db.order.total.amount,424,'checks that total order cost is 430');
  equal(db.order.total.weight,7.6,'checks that total order weight is 7.6');
//domestic .50 per pound  international 1.50 per pound
  equal(Math.round(parseFloat(db.order.total.shippingCost)*10)/10,11.4,'shipping total should be 11.4');
  equal(db.order.total.grand,435.4,'total cost of order should be 441.4');

  equal($('#order thead tr').length, 1, 'should be a header');
  equal($('#order tbody tr').length, 2, 'should be 2 product rows on order');
  equal($('#order tfoot tr').length, 1, 'should be a footer');

  equal($('#order tbody tr:nth-child(1) .productName').text(),'tire','first product should be tire name');
  equal($('#order tbody tr:nth-child(1) .productQuantity').text(),2,'first product should have quantity 2');

  equal($('#order tfoot td:nth-child(2)').text(),'3','should have chosen three items');
  equal($('#order tfoot td:nth-child(3)').text(),'424','total cost of items 430');
  equal($('#order tfoot td:nth-child(4)').text(),'7.6','weight of all items 7.6');
  equal(Math.round(parseFloat($('#order tfoot td:nth-child(5)').text())*10)/10,'11.4','total shipping cost 11.4');
  equal($('#order tfoot td:nth-child(6)').text(),'435.4','grand total 441.4');
});


test('Add Orders to Purchases Table', function(){
createTestProduct('windows-surface','windows-surface.png',1,800,50);//sale price 400
  createTestProduct('tire','tire.png',0.5,200,0);//sale price 200
  createTestProduct('basketball','basketball.png',6.6,30,20);//sale price 24
  createTestCustomer('Bob','bob.png',true);
  createTestCustomer('Sally','sally.png',false);
//2 tires added and a basketball to cart
  $('select#selectCustomer').val('Sally');
  $('select#selectCustomer').trigger('change');

  $('#products tbody tr:nth-child(2) .productImage img').trigger('click');
  $('#products tbody tr:nth-child(2) .productImage img').trigger('click');
  $('#products tbody tr:nth-child(3) .productImage img').trigger('click');

  $('#purchase').trigger('click');

  equal($('#order tbody tr').length, 0 , 'there are no more items in the order table');
  equal($('#order tfoot td:nth-child(6)').text(), '' , 'there is no total after purchase made');
  equal($('#selectCustomer').val(),'default', 'reset drop down to default Select a Customer');
  equal(db.purchases.length,1,'should be 1 order after purchase');
  ok(db.purchases[0] instanceof Purchase, 'should be instanceof purchase');
  ok(db.purchases[0].id,'should hve an ID after purchases');
  equal($('#purchases thead th').length,7,'there are 7 columns in purchases table');
  equal($('#purchases tbody tr').length,1,'there should be 1 row in purchases table');
  equal($('#purchases tbody .purchaseTime').text().split(' ').length,5,'there should be a time in the purchase time for the 1 purchase');
  equal($('#purchases tbody .purchaseCustomer').text(),'Sally','person who made purchase should have name in purchases table');
  equal($('#purchases tbody .purchaseTotal').text(),'424','purchase total should be in purchases table');
  equal(Math.round(parseFloat($('#purchases tbody .purchaseShipping').text())*10)/10,'11.4','shipping total should be in purchases table');
  equal($('#purchases tbody .purchaseGrand').text(),'435.4','grand total should be in purchases table');
  equal($('#purchases tbody .purchaseProducts .purchaseProductsList li').length,3,'should have 3 items in product list in ol');


});
