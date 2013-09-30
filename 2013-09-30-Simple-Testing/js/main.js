function add3 (num){
  return num+3;
}

function square(num){
  return Math.pow(num,2);
}

function volume(l,w,h){
  if (l < 0 || w < 0 || h < 0)
    return "ERROR";
  return l * w * h;
}

function power(num, pow){
  // if (pow == 0)
  //   return 1;
  var total = 1;
  for(i=0;i<pow;i++)
    total *= num;
  return total;
}

function greeting (salutation, name){
  return salutation + ", " + name + "!";
}


function piglatin(word){
  return word.slice(1) + word[0] + "a";
}

function piggreeting(salutation, name){
  return greeting(piglatin(salutation),piglatin(name));
}

function pigsentence(sentence){
  var words = sentence.split(" ");
  for(var i=0;i<words.length;i++)
    words[i] = piglatin(words[i]);
  return words.join(" ");
}