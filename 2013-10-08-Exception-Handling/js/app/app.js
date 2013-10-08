'use strict';
//error handling is useful when parts of your code are likely to 'blow up'
//ex) you are using a facebook api and want your program to still work even if they
//don't reply or take too long to reply to a request
$(document).ready(function(){
  $(document).foundation();
  try{
    console.log(blueshoe);
  }
  catch(e){
    console.log('You just recieved an error: '+ e);
  }
  try{
    console.log(isthiscorrect);
  }
  catch(err){
    console.log('You just recieved an error: '+ err);
  }
  console.log('Your made it to the end!');
});

