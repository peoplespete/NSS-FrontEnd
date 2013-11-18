/* global document, window, io */

$(document).ready(initialize);

var socket;
//Global Variables
var a = {}; //assessment
var rawQuestions;
var questionsText;
var f;
var defaultPercentRange = 20;
var defaultDecimalPoints = 2;

function initialize(){
  $(document).foundation();
  initializeSocketIO();
  checkFileReaderFunctionality();
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
  $('#fileList').append($output);
  var reader = new FileReader();
  reader.readAsText(f);
  reader.onload = (function(theFile) {
    rawQuestions = theFile.target.result; //questions
  });
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
  });

}



///////////////////////////////////////////////////////////////////////////////////////////

function removeInstructionsFromQuestionArray(questions){
  a.instructions = questions[0];
  questions.shift();
  return questions;
}

function parseNumsOutOfQuestion(question){
  var nums = question.match(/\d+/g);
  nums = _.map(nums, function(n){
    return parseFloat(n);
  });
  return nums;
}
function buildQuestionObjects(questionsText){
  questions = [];
  for(var i = 0; i < questionsText.length ; i++){
    var question = {};
    question.text = questionsText[i];
    ///these should be flaots not strings
    question.numbersActual = parseNumsOutOfQuestion(questionsText[i]);
    question.numbersRange = [];
    for(var j = 0; j<question.numbersActual.length; j++){
      var bounds = generateBounds(question.numbersActual[j]);
      question.numbersRange.push(bounds);
    }
    question.howToSolve = 7; //REVISIT
    questions.push(question);
  }
  return questions;
}


function generateBounds(num, percentRange, decimalPoints){
  if(percentRange === undefined) {
        percentRange = defaultPercentRange;
  }
  if(decimalPoints === undefined) {
        decimalPoints = defaultDecimalPoints;
  }
  percentRange /= 100;
  var bottomNum = num * (1 - percentRange);
  var topNum = num * (1 + percentRange);
  bottomNum = roundToDecimals(bottomNum, decimalPoints);
  topNum = roundToDecimals(topNum, decimalPoints);
  var bounds = [bottomNum, topNum];
  return bounds;
}

function generateNumberForStudent(bounds, decimalPoints){
  if(decimalPoints === undefined) {
        decimalPoints = defaultDecimalPoints;
  }
  var spread = bounds[1] - bounds[0];
  var num = Math.random() * spread;
  num+= bounds[0];
  num = roundToDecimals(num, decimalPoints);
  return num;
}

function roundToDecimals(num, decimalPoints){
  num*= Math.pow(10, decimalPoints);
  num = Math.round(num);
  num/= Math.pow(10, decimalPoints);
  return num;
}






























/////////////////////////////////////////////////////////////////////////////////
function initializeSocketIO(){
  var port = window.location.port ? window.location.port : '80';
  var url = window.location.protocol + '//' + window.location.hostname + ':' + port + '/app';

  socket = io.connect(url);
  socket.on('connected', socketConnected);
}

function socketConnected(data){
  console.log(data);
}

function checkFileReaderFunctionality(){
    // Check for the various File API support.
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    // Great success! All the File APIs are supported.
  } else {
    alert('The File APIs are not fully supported in this browser.');
  }
}