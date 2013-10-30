
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('home/index',{title:'HOMEPAGE'});//we are passing a title property to this file
};