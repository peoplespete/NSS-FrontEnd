var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var Assessment = mongoose.model('Assessment');


//GET /upload

exports.index = function(req, res){
  res.render('input/index', {title: 'Express'});
};

//POST /input

exports.create = function(req, res){
  // var questions = [];
  var counter = 0;
  for(var i = 0; i<req.body.questions.length; i++){
    var question = req.body.questions[i];
    question.numbersRange = makeArrayinArrayNumbers(question.numbersRange);
    new Question(question).save(function(err, question){
      counter++;
      if(counter === req.body.questions.length){
        Question.find().exec(function(err, questions){
          console.log(questions);
          var a = {};
          a.instructions = req.body.instructions;
          a.questions = questions;
          new Assessment(a).save(function(err, assessment){
            console.log('assessment saved' + assessment.questions);
            res.send(assessment);
          });
        });
      }
    });
  }
};





function makeArrayinArrayNumbers(numbersRange){
  for(var i =0; i<numbersRange.length; i++){
    for(var j = 0; j<numbersRange[i].length; j++){
      numbersRange[i][j] = parseFloat(numbersRange[i][j]);
    }
  }
  return numbersRange;
}








//GET /input

exports.displayTeacherDesign = function(req, res){
  res.render('input/teacher-design', {title: 'Teacher Design'});
};


