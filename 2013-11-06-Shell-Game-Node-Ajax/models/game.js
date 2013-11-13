var mongoose = require('mongoose');
var _ = require('lodash');

var Game = mongoose.Schema({
  player     : String,
  actual    : {type:Number, default: function(){ return _.sample([0,1,2]);}},
  guess    : {type: Number, default: 0},
  didWin  : {type: Boolean, default: false},
  createdAt  : {type: Date, default: Date.now}
});

mongoose.model('Game', Game);