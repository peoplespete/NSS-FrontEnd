function arraymultiply(numstoadd, multiplier){
  for(var i=0; i < numstoadd.length; i++)
    numstoadd[i] *= multiplier;
  return numstoadd;
}

function getsum(numstoadd){
  var sum = 0;
  for(var i = 0; i < numstoadd.length; i++)
    sum += numstoadd[i];
  return sum;
}

$(document).ready(function(){
  $('#calculate').click(function(){
    // debugger;
    var instr = $('#in').val();
    var nums = instr.split(', ');
    var num1 = parseInt(nums[0]);
    var multiplier = parseInt(nums[1]);
    var numstoadd = _.range(1,num1+1);
    numstoadd = arraymultiply(numstoadd, multiplier);
    var display = numstoadd.join(' + ') + ' = ' + getsum(numstoadd);
    $('#out').text(display);
  });

});