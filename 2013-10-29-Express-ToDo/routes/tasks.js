var database = require('../modules/database');

exports.index = function(req, res){
  var tasks = database.read('db/tasks.json');
  res.render('tasks/index', { title: 'Tasks | To Do App',tasks:tasks });

}

exports.new = function(req, res){
  res.render('tasks/new', { title: 'New Task | To Do App' });

}

exports.create = function(req, res){
  var task = {};
  task.task = req.body.task;
  task.dueDate = req.body.dueDate;
  task.color = req.body.color;
  var tasks = database.read(__dirname + '/../db/tasks.json');
  tasks.push(task);
  database.write(__dirname + '/../db/tasks.json',tasks);
  res.redirect('/tasks');
}