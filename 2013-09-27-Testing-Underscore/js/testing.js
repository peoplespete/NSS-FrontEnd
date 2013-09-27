test( "Filter Even Numbers", function() {
  var numbers = _.range(10); //create an input for your function
  ///(QUnit will send to the function)
  var expected = _.range(0,10,2);  //this is what we want output to be
  //(QUnit will look to see if what comes out of function being tested
  // is equal to expected)  LINE 4 Could also read [0,2,4,6,8];
  deepEqual( filterEvens(numbers), expected, "Filtered Evens Successfully!" );

});


test("Filter Long Strings (>3 chars)", function(){
  var string_list = ['hey','bro','how','you','is','friend'];
  var expected = ['friend'];
  deepEqual(filter_long_strings(string_list),expected,"Filtered Long Strings Successfully!");
});


test("Filter Medium Strings (>2 but <5 chars)", function(){
  var string_list = ['as','hey','bro','how','you','ream','is','friend'];
  var expected = ['hey','bro','how','you','ream'];
  deepEqual(filter_medium_strings(string_list),expected,"Filtered Medium Strings Successfully!");
});

test('Filter "A" Strings', function(){
  var string_list = ['as','ahoy','bro','Alex','you','ream','is','friend'];
  var expected = ['as','ahoy','Alex'];
  deepEqual(filter_a_strings(string_list),expected,"Filtered A Strings Successfully!");
});


test("Find A String", function(){
  var string_list = ['as','ahoy','bro','Alex','you','ream','is','friend'];
  var expected = 'Alex';
  deepEqual(find_a_string(string_list,'Alex'),expected,"Found the Alex string successfully!");
  deepEqual(find_a_string(string_list,'ahoy'),"ahoy","Found the ahoy string successfully!");
  deepEqual(find_a_string(string_list,'friend'),"friend","Found the friend string successfully!");
  deepEqual(find_a_string(string_list,'happymeal'),undefined,"Should not find the string");
});