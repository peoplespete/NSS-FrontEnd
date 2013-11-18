var mongoose = require('mongoose');

var Assessment = mongoose.Schema({
  instructions: String,
  questions: [{type: mongoose.Schema.Types.ObjectId, ref:'Question'}],
  createdAt: {type:Date, default: Date.now}
});

mongoose.model('Assessment', Assessment);
