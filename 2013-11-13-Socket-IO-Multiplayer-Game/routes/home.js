var _ = require('lodash');

exports.index = function(req, res){
  res.render('home/index', {title: 'Express', _:_});
};
