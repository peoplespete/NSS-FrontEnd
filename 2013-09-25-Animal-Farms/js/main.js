var dogs = [];
var name = prompt("Enter a dog's name or blank to exit.");
while (name)
{
  var dog = {};
  dog.name = name;
  dog.age = parseInt(prompt("Age?"));
  dog.breed = prompt("Breed?");
  dogs.push(dog);
  name = prompt("Enter a dog's name or blank to exit.");
}

debugger;
var avg_age;
var sum_age = 0;
for(i=0;i<dogs.length;i++)
  sum_age+= dogs[i].age;
avg_age = sum_age / dogs.length;
console.log(avg_age);