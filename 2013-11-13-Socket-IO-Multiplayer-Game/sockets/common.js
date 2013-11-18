// var mongoose = require('mongoose');
// var Game = mongoose.model('Game');
// var Player = mongoose.model('Player');
// var __ = require('lodash');
// var io;
var async = require('async');
var __ = require('lodash');
var m = require('../lib/mechanics');
var io;

exports.connection = function(socket){
  io = this;
  socket.emit('connected', {status: 'connected'});
  socket.on('disconnect', socketDisconnect);
  socket.on('startgame', socketStartGame);
  socket.on('playerMoved', socketPlayerMoved);
  socket.on('playerAttack', socketPlayerAttack);
};

function socketPlayerAttack(data){
  console.log(data);
}

function socketPlayerMoved(data){
  console.log(data);
  async.waterfall([
    function(fn){ m.findPlayer(data.player, fn);},
    function(player,fn){m.updateCoordinates(player, data.x, data.y, fn);},
    function(player){m.findGame(data.game, fn);},
    function(game,fn){m.emitPlayers(io.sockets,game.players,fn);}




    ]);
}

function socketDisconnect(){
}

function socketStartGame(data){
  // var socket = this;
  // Game.findOne({name: data.name}).populate('players').exec(function(err, game){
  //   if(game){
  //     console.log('found old game');
  //     addPlayer(game, data, socket);
  //   }else{
  //     new Game({name: data.name}).save(function(err, game){
  //       Game.findById(game.id).populate('players').exec(function(err, game){
  //         console.log('created new game');
  //         addPlayer(game, data, socket);
  //       });
  //     });
  //   }
  // });



  var storage = {};
  var socket = this;

  async.waterfall([
    function(fn){m.findGame(data.game,fn);},
    function(game,fn){if(!game){m.newGame(data.game,fn);}else{fn(null,game);}},
    function(game,fn){storage.game=game;fn();},
    function(fn){m.findPlayer(data.player,fn);},
    function(player,fn){if(!player){m.newPlayer(data.player,data.color,fn);}else{fn(null,player);}},
    function(player,fn){m.resetPlayer(player,socket,fn);},
    function(player,fn){storage.player=player;fn();},
    function(fn){fn(null,__.any(storage.game.players,function(p){return p.id===storage.player.id;}));},
    function(isFound,fn){if(!isFound){m.attachPlayer(storage.game,storage.player,fn);}else{fn(null,storage.game);}},
    function(game,fn){m.findGame(data.game,fn);},
    function(game,fn){m.emitPlayers(io.sockets,game.players,fn);}
  ]);
}


function addPlayer(game, data, socket){
  Player.findOne({name: data.player}, function(err, player){
    if(player){
      //this means the player already existed
      var found = __.any(game.players, function(id){
        return id.toString() === player.id;
      });
      if(found){
        //this means player was in game already
        player.health = 100;
        player.save(function(err, player){
          console.log(player.name + ' found in game; restored to 100% health');
        });
      }else{
        //player existed but not in game
        game.players.push(player);
        game.save(function(err, game){
          console.log(player.name + ' added to game');
          notifyPlayersOfJoin(game.players, socket);
        });
      }
    }else{
      //this means player has never existed and must be added to game
      new Player({name: data.player, color: data.color, socketId: socket.id}).save(function(err, player){
        game.players.push(player);
        game.save(function(err, game){
          console.log(player.name + ' created and added to game');
          notifyPlayersOfJoin(game.players, socket);
        });
      });
    }
  });
}


function notifyPlayersOfJoin(players, socket){
  console.log("notifyingplayers");
  for(var i = 0; i<players.length; i++){
    if(socket.namespace.sockets[players[i].socketId]){
      socket.namespace.sockets[players[i].socketId].emit('playerjoined',{players:players});
    }
  }
}

