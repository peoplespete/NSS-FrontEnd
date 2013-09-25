var studentscores=[];
var variances = [];
var sum = 0;
var average;
var stddev;

for (i=0;i<10;i++)
{
  studentscores.push(parseFloat(prompt("What is student "+ (i+1) +"'s score?")));
  sum += studentscores[i];

}
average = sum / studentscores.length;

for (i=0;i<studentscores.length;i++)
  variances.push(Math.pow((average-studentscores[i]),2));

sum =0;
for(i=0;i<variances.length;i++)
  sum += variances[i];

stddev = Math.sqrt(sum / variances.length);

alert("The mean is: " + average + ".  The standard deviation is: " + Math.round(stddev*1000)/1000 + ".");
