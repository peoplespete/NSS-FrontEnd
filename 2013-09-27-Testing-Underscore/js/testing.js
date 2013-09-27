test( "Filter Even Numbers", function() {
  var numbers = _.range(10); //create an input for your function
  ///(QUnit will send to the function)
  var expected = _.range(0,10,2);  //this is what we want output to be
  //(QUnit will look to see if what comes out of function being tested
  // is equal to expected)  LINE 4 Could also read [0,2,4,6,8];
  deepEqual( filterEvens(numbers), expected, "Filtered Evens Successfully!" );

});