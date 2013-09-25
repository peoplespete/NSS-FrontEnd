var playing = true;
var ans;
var ptdistance;
while(playing)
{
  var point1 = {};
  var point2 = {};

  point1.x = parseFloat(prompt("Enter your x-coordinate for point 1:"));
  point1.y = parseFloat(prompt("Enter your y-coordinate for point 1:"));
  point2.x = parseFloat(prompt("Enter your x-coordinate for point 2:"));
  point2.y = parseFloat(prompt("Enter your y-coordinate for point 2:"));

  ptdistance = Math.sqrt(Math.pow((point2.x-point1.x),2)+Math.pow((point2.y-point1.y),2));
  ptdistance = ptdistance.toFixed(3);
  ans = prompt("Your distance between points was " + ptdistance + ".  Do you want to keep playing? (Use all lowercase)")
  if(ans.toLowerCase()!='yes')
    playing = false;
}