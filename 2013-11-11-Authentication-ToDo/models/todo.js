var mongoose = require('mongoose');


var Todo = mongoose.Schema({
  title: { type: String, required: true},
  category: {type: String},
  isComplete: {type: Boolean, default: false},
  dueDate: {type:Date},
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  createdAt: {type:Date, default: Date.now}
});

mongoose.model('Todo', Todo);
