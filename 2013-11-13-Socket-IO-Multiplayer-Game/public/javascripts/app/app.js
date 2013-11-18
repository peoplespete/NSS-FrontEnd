/* global document, getValue, window, io */

$(document).ready(initialize);

var socket;
var name;
var player;
var color;
var players;

function initialize(){
  $(document).foundation();
  initializeSocketIO();
  $('#start').on('click',clickStart);
  $('body').on('keydown', keypressMove);
  $('#grid').hide();
}

function keypressMove(e){
  console.log(e.keyCode);
  var isArrow = _.any([37,38,39,40], function(i){
    return i === e.keyCode;
  });
  if(e.keyCode === 13){
    var prey = findPrey();
    socket.emit('playerAttack', {game: game, attacker: player, prey: prey.name});
  }

  if(isArrow){
    var x = $('.block:contains(' + player + ') ').data('x');
    var y = $('.block:contains(' + player + ') ').data('y');
    ///PROBLEM HERE!!!!
    console.log(x + ', '+y);
    var p = findPlayer();
    switch(e.keyCode){
      case 38:
      //up
        p.y--;
        break;
      case 40:
      //down
        p.y++;
        break;
      case 37:
      //left
        p.x--;
        break;
      case 39:
      //right
        p.x++;
        break;
    }
    socket.emit('playerMoved', {game: name, player: player, x: p.x, y: p.y});
  }
}

function findPrey(){
//PROBLEM HERE ... NO CODE
}

function clickStart(){
  name = getValue('#name');
  player = getValue('#player');
  color = getValue('#color');
  $('#grid').show();
  $('#currentPlayer').text(player);
  socket.emit('startgame', {name:name, player:player, color:color});
}

function initializeSocketIO(){
  var port = window.location.port ? window.location.port : '80';
  var url = window.location.protocol + '//' + window.location.hostname + ':' + port + '/app';

  socket = io.connect(url);
  socket.on('connected', socketConnected);
  socket.on('playerjoined', socketPlayerJoined);

}

function findPlayer(){
  return _.find(players, function(p){return p.name === player;});
}

function socketConnected(data){
  console.log(data);
}

function socketPlayerJoined(data){
  console.log(data);
  players = data.players;
  $('#grid .gamePiece').remove();
  for(var i = 0; i < data.players.length; i++){
    htmlCreateAndPlaceGamePiece(data.players[i]);
  }
}


function htmlCreateAndPlaceGamePiece(player){
  var $piece = $('<div>');
  $piece.addClass('gamePiece');
  var $health = $('<div>');
  $health.addClass('healthBar');
  $health.css('width', player.health/3);
  $piece.append($health);
  $piece.css('background-color', player.color).text(player.name);
////HEALTH BAR DOESN"T SHOUW UP???!!??
  $('#grid [data-x=' + player.x + '][data-y=' + player.y + ']').append($piece);

}