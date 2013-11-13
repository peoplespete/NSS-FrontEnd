var mongoose = require('mongoose');
var Priority = mongoose.model('Priority');
var Todo = mongoose.model('Todo');


/*
 * GET /todos
 */

exports.index = function(req, res){
  Priority.find(function(pErr, priorities){
    Todo.find().populate('priority').exec(function(tErr, todos){
      res.render('todos/index', {title: 'ToDo List', priorities:priorities, todos:todos});
    });
  });
};


/*
 * POST /todos
 */

exports.create = function(req, res){
  console.log(req.body);
  new Todo(req.body).save(function(err, todo, count){
    console.log(todo);
    Todo.findById(todo.id).populate('priority').exec(function(err, todo){
      console.log(todo);
      res.send(todo);
    });
  });
};



/*
 * DELETE /todos/:id
 */

exports.delete = function(req, res){
  Todo.findByIdAndRemove(req.params.id, function(err, todo){
    console.log('Deleted');
    console.log(todo.id);
    res.send(todo);
  })
};