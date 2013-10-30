var database = require('../modules/database');
/*
 * GET people page.
 */

exports.index = function(req, res){
  var people = database.read(__dirname + '/../db/people.json');
  res.render('people/index', { title: 'People Page: Friends',people:people });
};

/*
 * GET people/new page.
 */

exports.new = function(req, res){
  res.render('people/new', { title: 'Add a Friend' });
};

/*
 * POST people/new page.
 */

exports.create = function(req, res){
  var person = {};
  person.name = req.body.name;
  person.gender = req.body.gender;
  person.age = parseInt(req.body.age);
  person.color = req.body.color;
  var people = database.read(__dirname + '/../db/people.json');
  people.push(person);
  database.write(__dirname + '/../db/people.json',people);
  res.redirect('/people');
};