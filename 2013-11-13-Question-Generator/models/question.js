var mongoose = require('mongoose');

var Question = mongoose.Schema({
  text: String,
  numbersActual: [Number],
  numbersRange: {},
  howToSolve: Number,
  createdAt: {type:Date, default: Date.now}
});

mongoose.model('Question', Question);