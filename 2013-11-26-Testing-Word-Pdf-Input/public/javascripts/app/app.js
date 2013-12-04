/* global document, window, io */

$(document).ready(initialize);

var socket;

function initialize(){
  $(document).foundation();
  initializeSocketIO();
  $('#file').on('change', handleFileSelect);
  $('#upload').on('click', clickUpload);
}

function handleFileSelect(evt) {
  f = evt.target.files[0]; // FileList object
  // files is a FileList of File objects. List some properties.
  var $output = $('<ol><li><strong>' + f.name + '</strong> (' + (f.type || 'n/a') + ') - ' +
                f.size + ' bytes, last modified: ' +
                (f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a') +
                '</li></ol>');
  console.log(f);
// function sendAjaxRequest(url, data, verb, altVerb, event, successFn){
  sendAjaxRequest('/upload',f,'post',null,evt, function(data){
    console.log(data);
  });
  // $('#fileList').append($output);
  // var reader = new FileReader();
  // reader.readAsText(f);
  // reader.onload = (function(theFile) {
  //   rawQuestions = theFile.target.result; //questions
  // });
}

function clickUpload(){
  $('#upload').addClass('disabled').off('click');
  questionsText = rawQuestions.split(/\n\d+./);
  questionsText = _.map(questionsText, function(q){return q.trim();});
  questionsText = removeInstructionsFromQuestionArray(questionsText);
  a.questions = buildQuestionObjects(questionsText);
  console.log(a.questions);
  //sendAjaxRequest(url, data, verb, altVerb, event, successFn){
  sendAjaxRequest('/input', a, 'post', null, null, function(data){
    console.log(data);
    // $('#upload').removeClass('disabled').on('click', clickUpload);
    $('#designAssessment').attr('href','/input/'+ data._id);
    $('#designAssessment').show();
  });

}

function initializeSocketIO(){
  var port = window.location.port ? window.location.port : '80';
  var url = window.location.protocol + '//' + window.location.hostname + ':' + port + '/app';

  socket = io.connect(url);
  socket.on('connected', socketConnected);
}

function socketConnected(data){
  console.log(data);
}
