var mongoose = require('mongoose');
var Game = mongoose.model('Game');
/*
 * GET /
 */

exports.index = function(req, res){
  res.render('games/index', {title: 'Express'});
};



/*
 * GET /games/start
 */

exports.create = function(req, res){
  new Game(req.query).save(function(err, game, count){
    res.send(game);
  });
};


/*
 * GET /games/:id
 */

exports.score = function(req, res){
  Game.findById(req.params.id, function(err, game){
    game.guess = req.body.guess;
    game.didWin = game.actual === game.guess;
    console.log(err);
    console.log(game);
    game.save(function(err, game){
      res.send(game);
    });
  });
};
