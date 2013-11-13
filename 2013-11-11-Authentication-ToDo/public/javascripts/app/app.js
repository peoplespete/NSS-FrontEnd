$(document).ready(initialize);

var socket;

function initialize(){
  $(document).foundation();
  initializeSocketIO();
  $('#authentication').hide();
  $('#authentication-button').on('click', clickLoginSignUp);
  $('#register').on('click', clickSignUp);
  $('#login').on('click', clickLogin);
  $('table#adminList').on('click','input[type="checkbox"]', toggleAdminStatus);
}

function initializeSocketIO(){
  var port = location.port ? location.port : '80';
  var url = location.protocol + '//' + location.hostname + ':' + port + '/app';

  socket = io.connect(url);
  socket.on('connected', socketConnected);
}

function socketConnected(data){
  console.log(data);
}

function clickLoginSignUp(e){
  //toggles signin signup menu
  if($('#authentication-button').attr('data-email') !== 'anonymous'){
    sendAjaxRequest('/logout', {}, 'post', 'delete', e, function(data){
      htmlRestoreLoginLook();
    });
  }else{
    if($('#authentication').hasClass('hidden')){
      $('#authentication').hide();
      $('#authentication').removeClass('hidden');
      $('#authentication').fadeIn(1000);
    }else{
      $('#authentication').show();
      $('#authentication').hide();
      $('#authentication').addClass('hidden');

    }
    $('input[name="email"]').focus();
  }


    e.preventDefault();
}

function clickSignUp(e){
  var url = '/users';
  var data = $('form#authentication').serialize();
  sendAjaxRequest(url, data, 'post', null, e, function(status){
    htmlCompletedRegistrationAttempt(status, 'registration');
  });
}

function clickLogin(e){
  var url = '/login';
  var data = $('form#authentication').serialize();
  sendAjaxRequest(url, data, 'post', 'put', e, function(data){
    console.log(data);
    if(data.status==='ok'){
      htmlCompletedRegistrationAttempt(data);
      htmlChangeButtonText(data.email);
    }else{
      htmlCompletedRegistrationAttempt(data, 'login');
    }
  });
}

function toggleAdminStatus(){
  var url = '/admin/' + $(this).attr('data-id');
  // var id = $(this).attr('data-id');
  console.log(url);
  sendAjaxRequest(url, {}, 'post', 'put', null, function(data){
    //$('table#adminList input[data-id='+id+']').attr('checked', data.isAdmin);
  });

}


//////////////////////////////////////////////////////////////////////////////////

function htmlCompletedRegistrationAttempt(data, logOrReg){
  console.log(status);
  $('input[name="email"]').val('').focus();
  $('input[name="password"]').val('');
  if(data.status === 'ok'){
    $('#authentication').show();
    $('#authentication').hide();
    $('#authentication').addClass('hidden');
  }else{
    alert('There was a problem with your ' + logOrReg + ', please try again.');
  }
}


function htmlChangeButtonText(newText, isReset){
  if(isReset){
    $('#authentication-button').attr('data-email', 'anonymous');
  }else{
    $('#authentication-button').attr('data-email', newText);
  }
  $('#authentication-button').text(newText).toggleClass('alert');
}

function htmlRestoreLoginLook(){
  htmlChangeButtonText('Login | Sign Up', true);
}