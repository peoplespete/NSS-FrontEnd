// test( "Name of Function being tested", function() {
// deepEqual( actual_value, expected_value, "message" );//this line is an assertion
// deepEqual( actual_value, expected_value, "message" );
// });

test( "1+1", function() {
  deepEqual( 1+1, 2, "adding 1 and 1" );
});

test( "Nashville[0]", function() {
  deepEqual( "nashville"[0], 'n', "does nashville start with an n?" );
});

test( "add 3", function() {

  deepEqual( add3(4), 7, "4 add 3" );
  deepEqual( add3(2), 5, "2 add 3" );
  deepEqual( add3(-10), -7, "-10 add 3" );
  deepEqual( add3(0), 3, "0 add 3" );
});

test( "square", function() {

  deepEqual( square(4), 15.9999999999999999, "4 squared" ); //just enough 9's repeating to pass
  deepEqual( square(2), 4, "2 squared" );
  deepEqual( square(-10), 100, "-10 squared" );
  deepEqual( square(0), 0, "0 squared" );
});

test( "volume_rect_prism", function() {

  deepEqual( volume(4,1,10), 40, "4,1,10 volume" ); //just enough 9's repeating to pass
  deepEqual( volume(2,2,5), 20, "2,2,5 volume" );
  deepEqual( volume(-10,5,5), "ERROR", "-10,5,5 volume" );
  deepEqual( volume(0,4,5), 0, "0,4,5 volume" );
});

test( "power", function() {

  deepEqual( power(4,1), 4, "four to first" ); //just enough 9's repeating to pass
  deepEqual( power(2,5), 32, "2 to fifth" );
  deepEqual( power(-10,5), -100000 , "-10 to fifth" );
  deepEqual( power(0,0), 1, "zero to zero" );
});

test("greeting", function() {
  deepEqual( greeting("hello","janet"), "hello, janet!", "hello janet" ); //just enough 9's repeating to pass
  deepEqual( greeting("sionara", "steve"), "sionara, steve!", "sionara steve" );

});


test("piglatin", function() {
  deepEqual( piglatin("hello"), "elloha", "hello" ); //just enough 9's repeating to pass
  deepEqual( piglatin("peter"), "eterpa", "peter" );

});

test("piggreeting", function() {
  deepEqual( piggreeting("hello","janet"), "elloha, anetja!", "hello janet" ); //just enough 9's repeating to pass
  deepEqual( piggreeting("howdy","ron"), "owdyha, onra!", "howdy ron" );

});

test("pig_sentence", function(){
  var sentence = "four score and seven years ago";
  var expected = "ourfa coresa ndaa evensa earsya goaa";
  deepEqual(pigsentence(sentence),expected, "four score and seven years in pig latin");

});