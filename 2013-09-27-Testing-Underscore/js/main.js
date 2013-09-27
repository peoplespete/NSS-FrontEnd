function filterEvens(numbers)
{
  return _.filter(numbers,function(num){
    return num%2==0;//this function takes the elements of numbers one by one
    //into function.  it is then returned if the condition is true to become
    //a new element in the filtered array that is returned by _.filter
    //so the num%2==0 must be a condition!
  });
}

function filter_long_strings(stringsac)
{
  return _.filter(stringsac,function(strng){
    return strng.length>3;
  });
}

function filter_medium_strings(stringsac)
{
  return _.filter(stringsac,function(strng){
    return strng.length>2 && strng.length<5;
  });
}

function find_a_string(word_list, target){
  return _.find(word_list, function(item){
    return item == target;
  });
}


function filter_a_strings(stringsac)
{
  return _.filter(stringsac,function(strng){
    return strng[0].toLowerCase()=='a';
  });
}

function findEnding(stringsac,letter){
  return _.find(stringsac,function(word){
    // alert("End of " + word + " is " + word[word.length-1]);
    return word[word.length-1] == letter;
  });
}
function sortnums(numlist)
{
  return _.sortBy(numlist, function(num){return -num;}) //negative in from of sum reverses the order
}

// var nummers = [1,6,3,7,8,5,3];
// alert(nummers);
// alert(sortnums(nummers));
// alert(_.shuffle(nummers));
