function filterEvens(numbers)
{
  return _.filter(numbers,function(num){
    return num%2==0;//this function takes the elements of numbers one by one
    //into function.  it is then returned if the condition is true to become
    //a new element in the filtered array that is returned by _.filter
    //so the num%2==0 must be a condition!
  });
}

