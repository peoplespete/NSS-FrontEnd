var unoconv = require('unoconv');

//Get /
exports.index = function(req, res){
  res.render('home/index', {title: 'Express'});
};

//Post /upload
exports.parse = function(req, res){
  console.log('youre in');
  console.log(req.body);
  res.send(req.body);
};


// unoconv.convert('document.docx', 'pdf', function (err, result) {
//     // result is returned as a Buffer
//     fs.writeFile('converted.pdf', result);
// });