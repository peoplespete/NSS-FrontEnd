
/*
 * GET home page.
 */

exports.index = function(req, res){  //req info browser sends to server //res is response
  res.render('home');//this looks for view index and passes it title object
};