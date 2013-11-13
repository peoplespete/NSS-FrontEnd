var mongoose = require('mongoose');
var Game = mongoose.model('Game');
var Player = mongoose.model('Player');
var __ = require('lodash');

exports.connection = function(socket){
  socket.emit('connected', {status: 'connected'});
  socket.on('disconnect', socketDisconnect);
  socket.on('startgame', socketStartGame)
};

function socketDisconnect(){
}

function socketStartGame(data){
  var socket = this;
  Game.findOne({name: data.name}).populate('players').exec(function(err, game){
    if(game){
      console.log('found old game');
      addPlayer(game, data, socket);
    }else{
      new Game({name: data.name}).save(function(err, game){
        Game.findById(game.id).populate('players').exec(function(err, game){
          console.log('created new game');
          addPlayer(game, data, socket);
        });
      });
    }
  });
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