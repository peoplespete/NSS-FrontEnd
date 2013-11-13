var mongoose = require('mongoose');
var Priority = mongoose.model('Priority');

/*
 * POST /priorities
 */

exports.create = function(req, res){
  console.log(req.body);
  new Priority(req.body).save(function(err, priority, count){
    res.send(priority);

  });

};