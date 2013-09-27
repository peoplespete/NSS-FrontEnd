// var menu = [];
// var addingitems = true;
// var alreadyput = false;
// debugger;
// while(addingitems)
// {
//   var item = {};
//   var categories = [];
//   item.name = prompt("What is your item's name?");
//   item.type = prompt("What is your item's type?");
//   item.price = parseFloat(prompt("What is your item's price?"));
//   item.calories = parseFloat(prompt("What is your item's calories?"));
//   item.ingredients = prompt("What is your item's ingredients?");
//   for(i=0;i<menu.length;i++)
//   {
//     if(menu[i][0].type == item.type)
//     {
//       menu[i].push(item);
//       alreadyput = true;
//     }
//   }
//   if(!alreadyput)
//   {
//     categories.push(item);
//     menu.push(categories);
//   }
//   var response = prompt("More items to add?").toLowerCase();
//   if(response=='no')
//     addingitems = false;

//   alert(response);

// }

//Chyld Medford's Version
var menu = {};
menu.sections = {};
menu.number_of_sections = parseInt(prompt("How many sections will your menu have?"));
menu.totalcalories = 0;
for(i=0;i<menu.number_of_sections;i++)
{
  var section_name = prompt("Name of Section " + (i+1) + ":");
  menu.sections[section_name] = [];
}

var response = prompt("Menu section or blank to exit:");
while(response)
{
  var item = {};
  item.name = prompt("Name:");
  item.calories = parseInt(prompt("Calories:"));
  item["cost"]= parseFloat(prompt("Price:"));
  item["ingredients"] = prompt("Ingredients:").split(" ");
  menu.sections[response].push(item);

  response = prompt("Menu section or blank to exit:");
}
debugger;

var section_list = object.getOwnPropertyNames(menu.sections);

for(i=0;i<section_list.length;i++)
{
  for(j=0;j<menu.sections[sections_list[i]].length;j++)
  {
    menu.totalcalories += menu.sections[sections_list[i]][j].calories;
                          // menu.sections["apps"]
                          // [i1,i2,i3][0]
                          // i1.calories
  }
}

















