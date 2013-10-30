
/*
 * GET cats page.
 */

exports.index = function(req, res){  //req info browser sends to server //res is response
  res.render('cats');//this looks for view index and passes it title object
};