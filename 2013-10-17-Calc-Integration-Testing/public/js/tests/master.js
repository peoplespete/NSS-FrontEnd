'use strict';
//module('name-of-section-for-grouping', {setup: setupTest, teardown: teardownTest});
module('Integration Testing', {setup: setupTest, teardown: teardownTest});

function setupTest(){  //code to run before test
  initialize(null,true);
}

function teardownTest(){ //code to run after test

}

// test('name-of-test', function(){
//   expect(2);
// });

test('Calculate 2 numbers', function(){  //use this type when there is an event involved
  expect(4);  //how many assertions you expect back

  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('*');
  //use 'change' if you are looking for change in input box
    //assertions go in here, that is because the DOMchanged on #result means the
    //stuff done is ready to be checked.
    //deepEqual(actual value,expected, 'text for what you expect');
  $('#calculate').trigger('click'); // just put the last one at the bottom

  deepEqual($('#op1').val(),'', 'op1 should be blank');
  deepEqual($('#op2').val(),'', 'op2 should be blank');
  deepEqual($('#operator').val(),'', 'operator should be blank');
  deepEqual($('#result').text(),'6', 'result should be 6');
    //there are 4 just like the number in the expect above


});


test('Print History', function(){
  expect(7);

  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('+');
  $('#calculate').trigger('click');

  $('#op1').val('7');
  $('#op2').val('8');
  $('#operator').val('*');
  $('#calculate').trigger('click');

  deepEqual($('#history li').length,2, 'make sure there are the right number of lis in #History ul');
  deepEqual($('#history > li:first-child > span').length,4, 'make sure each li has 4 spans');
  ok($('#history > li:first-child > span:nth-child(1)').hasClass('op1'),'1st operator should have class op1');
  ok($('#history > li:first-child > span:nth-child(2)').hasClass('operator'),'operator should have class operator');
  ok($('#history > li:first-child > span:nth-child(3)').hasClass('op2'),'2nd operator should have class op2');
  ok($('#history > li:first-child > span:nth-child(4)').hasClass('result'),'result should have class result');
  deepEqual($('#history > li:first-child').text(),'7*8=56Remove', 'make sure li has correct text');
    //there are 4 just like the number in the expect above
});

test('Remove Item', function(){
  expect(2);

  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('+');
  $('#calculate').trigger('click');

  $('#op1').val('7');
  $('#op2').val('8');
  $('#operator').val('*');
  $('#calculate').trigger('click');

  $('#op1').val('2');
  $('#op2').val('2');
  $('#operator').val('/');
  $('#calculate').trigger('click');

  $('#op1').val('9');
  $('#op2').val('2');
  $('#operator').val('-');
  $('#calculate').trigger('click');

  $('#history > li:nth-child(3) > .remove').trigger('click');

  deepEqual($('#history li').length,3, 'check if there are correct number after delete occurs');
  ok($('#history > li:nth-child(3) > .operator').text()!=='/', 'checks that deleted one is gone');
});

test('Color Every Other History', function(){
  expect(4);

  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('+');
  $('#calculate').trigger('click');

  $('#op1').val('7');
  $('#op2').val('8');
  $('#operator').val('*');
  $('#calculate').trigger('click');

  $('#op1').val('2');
  $('#op2').val('2');
  $('#operator').val('/');
  $('#calculate').trigger('click');

  $('#op1').val('9');
  $('#op2').val('2');
  $('#operator').val('-');
  $('#calculate').trigger('click');

  ok($('#history > li:nth-child(even)').css('background-color')==='rgb(50, 200, 150)', 'checks that color of even ones is rgb(50,200,150)');
  ok($('#history > li:nth-child(odd)').css('background-color')==='rgb(200, 50, 150)', 'checks that color of odds are rgb(200,50,150)');

  $('#history > li:nth-child(3) > .remove').trigger('click');

  ok($('#history > li:nth-child(even)').css('background-color')==='rgb(50, 200, 150)', 'checks that color of even ones is rgb(50,200,150)');
  ok($('#history > li:nth-child(odd)').css('background-color')==='rgb(200, 50, 150)', 'checks that color of odds are rgb(200,50,150)');

});
