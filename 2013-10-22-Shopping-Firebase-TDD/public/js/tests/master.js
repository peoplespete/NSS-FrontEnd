'use strict';

module('Integration Testing', {setup: setupTest, teardown: teardownTest});

function setupTest(){
  turnHandlersOff();
  turnHandlersOn();
  // Reset Global Variables Here
  db.products = [];
  db.customers = [];
  db.orders = [];
  // Clean Out Test Database Here
  Δdb.remove();
}

function teardownTest(){
}

test('Add Product', function(){
  expect(12);

  $('#productImage').val('/img/windows-surface.png');
  $('#productName').val('Windows Surface');
  $('#productWeight').val('1.3');
  $('#productPrice').val('329.00');
  $('#productPercentOff').val('10');
  $('#addProduct').trigger('click');

  equal(db.products.length,1,'checks that local products array has 1 element');
  ok(db.products[0].id,'checks that there is an id for the product');
  equal(db.products[0].image,'/img/windows-surface.png','checks that image is added to product');
  equal(db.products[0].name,'Windows Surface','checks that name is added to product');
  equal(db.products[0].weight,1.3,'checks that weight is added to product');
  QUnit.close(db.products[0].salePrice(),296.1,1,'checks that salePrice product function works');
  ok(db.products[0] instanceof Product, 'checks that product added is a product object');

  equal($('#products tr').length,2,'checks that table of products has 2 rows');
  equal($('#products tr:nth-child(2) > td').length,6,'checks that table rows have 6 cells');
  equal($('#products .productName').text(),'Windows Surface','this checks product name in table');
  QUnit.close(parseFloat($('#products .productSalePrice').text()),296.10,1,'checks that products salePrice was displayed in table');
  equal($('#products .productImage img').attr('src'),'/img/windows-surface.png','checks that products salePrice was displayed in table');


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
  equal($('table#products tr').length, 6, 'table should have 5 products and header');
  equal($('#previous:not(.hidden)').length,1,'previous button should not be hidden');
  equal($('#next:not(.hidden)').length,1,'next button should not be hidden');

  $('#next').trigger('click');

  equal(db.pagination.currentPage, 3, 'should be on third page');
  equal($('table#products tr').length, 3, 'table should have 2 products and header');
  equal($('#previous:not(.hidden)').length,1,'previous button should not be hidden');
  equal($('#next.hidden').length,1,'next button should be hidden');

  $('#previous').trigger('click');
  $('#previous').trigger('click');

  equal(db.pagination.currentPage, 1, 'should be on first page');
  equal($('table#products tr').length, 6, 'table should have 5 products and header');
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
