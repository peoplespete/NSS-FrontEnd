var rooms = []
var addingrooms = true;
var ans;
var priceperwindow = 250;
var priceperfoot = 200;

function createroom()
{
  var room = {};
  room.name = prompt("Enter room name:");
  room.l = parseInt(prompt("Enter the " + room.name + "'s length:"));
  room.w = parseInt(prompt("Enter the " + room.name + "'s width:"));
  room.areacost =  room.l * room.w * priceperfoot;
  room.windows = parseInt(prompt("Enter the " + room.name + "'s number of windows:"));
  room.windowcost = room.windows * priceperwindow;
  room.totalcost = room.areacost + room.windowcost;
  rooms.push(room);
  ans = prompt("Would you like to add another room?");
  if(ans.toLowerCase() != 'yes')
    addingrooms = false;
}

function printreport()
{
  console.log("HOUSE BUILD REPORT:");
  console.log("Total Number of Rooms: " + rooms.length);
  console.log("Total Number of Windows: " + windowsum);
  console.log("Total Number of Square Feet: " + areasum);
  console.log("Total Cost of Windows: " + windowcostsum);
  console.log("Total Cost of Square Feet: " + areacostsum);
  console.log("Total Cost of your House: " + (windowcostsum + areacostsum));
}

while(addingrooms)
{
  createroom();
}
var windowsum = 0;
var areasum = 0;
var windowcostsum = 0;
var areacostsum = 0;

for(i=0;i<rooms.length;i++)
{
  windowsum += rooms[i].windows;
  areasum += rooms[i].l * rooms[i].w;
  windowcostsum += rooms[i].windowcost;
  areacostsum += rooms[i].areacost;
}

printreport();