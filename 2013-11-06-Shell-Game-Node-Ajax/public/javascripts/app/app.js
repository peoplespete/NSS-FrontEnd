$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('form#game').on('submit', submitGame);
  $('#cups img').on('click', clickCup);

}
// ------------------------------------------------------------------------- //

function submitGame(e){
  var url = $(this).attr('action') + '?player=' + $('input[name=player]').val();
  sendGenericAjaxRequest(url, {}, 'post', null, e, function(game, status){
    htmlShowGame(game);
  });
}

function sendGenericAjaxRequest(url, data, verb, altVerb, event, successFn){
  var options = {};
  options.url = url;
  options.type = verb;
  options.data = data;
  options.success = successFn;
  options.error = function(jqXHR, status, error){console.log(error);};

  if(altVerb) options.data._method = altVerb;
  $.ajax(options);
  if(event) event.preventDefault();
}

// ------------------------------------------------------------------------- //

function clickCup(){
  var guess = $(this).data('position');
  var url = '/games/' + $(this).closest('div').data('game');

  sendGenericAjaxRequest(url, {guess: guess}, 'post', 'put', null, function(game, status){
    if(game.didWin){
      alert("YOU WON!!!");
    }else{
      alert("YOU LOSE!!!");
    }
  });
}

// ------------------------------------------------------------------------- //





function htmlShowGame(game){
  $('#game-display').show();
  $('#welcomeMessage').text('Welcome ' + game.player + '!');
  $('#cups').attr('data-game', game._id);
  $('#cup0').attr('data-position',0);
  $('#cup1').attr('data-position',1);
  $('#cup2').attr('data-position',2);

}
