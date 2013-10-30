
/*
 * GET colors page.
 */
var fs = require('fs');//this is the node file that allows you to read or write to files


exports.index = function(req, res){
  var colors = fs.readFileSync('colors.json');
  colors = JSON.parse(colors);
  res.render('colors/index',{title:'COLORS', colors: colors});
};

exports.new = function(req,res){
  res.render('colors/new',{title:'NEW COLORS'});
};

exports.create = function(req,res){
  var color = req.body.color;
  var data = fs.readFileSync('colors.json');
  var colors = JSON.parse(data); //converts string data into js object
  colors.push(color);
  fs.writeFileSync('colors.json', JSON.stringify(colors));
  res.redirect('/colors');  //this prevents users from repeating post when they hit refresh.
  //it sends them to /colors which does a get so when they refresh the last thing done was a get.
};