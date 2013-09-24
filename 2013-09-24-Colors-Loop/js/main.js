var colors = [];
var response = prompt('Enter a color:');

while (response)
{
  colors.push(response);
  response = prompt('Enter a color or quit:');
}
debugger;
for(var i = 0; i < colors.length ; i++)
{
  console.log('You typed in color: ' + colors[i]);
}