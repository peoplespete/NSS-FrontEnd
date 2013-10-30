
/*
 * GET /colors
 */

exports.index = function(req, res){
  var colors = ['blue','green','pink','orange','brown'];

  res.render('colors/index', {title: 'Colors',colors:colors});
};
