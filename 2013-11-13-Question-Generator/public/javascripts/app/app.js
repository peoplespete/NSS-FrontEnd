/* global document, window, io */

$(document).ready(initialize);

var socket;

function initialize(){
  $(document).foundation();
  initializeSocketIO();
  checkFileReaderFunctionality();
  $('#upload').on('click', clickUpload);
  $('#file').on('change', handleFileSelect);
}

function clickUpload(){
  console.log('you wanna upload');
  var reader = new FileReader();
  // Closure to capture the file information.
  //THE F BELOW HERE IS UNDEFINED IT SHOULD BE THE FILE ITSELF THAT IS SEEN IN HANDLE FILE SELECT
  //AND IS FILES[0].  FOR MORE TUTORIALS : http://www.html5rocks.com/en/tutorials/file/dndfiles/
  //CAN I COMBINE HANDLEFILESELECT AND CLICKUPLOAD SO THAT THEY ARE ALL ONE FUNCTION???
  //HOW TO GET EVT TO COME INTO CLICK UPLOAD THOUGH...
  var f;
  reader.onload = (function(theFile) {
    return f;
  });
  // Read in the file as a text document
  reader.readAsText(f);
  var filling = reader.result;
  console.log(filling);
}

function handleFileSelect(evt) {
  var files = evt.target.files; // FileList object
  // files is a FileList of File objects. List some properties.
  var f = files[0];
  var $output = $('<ol><li><strong>' + f.name + '</strong> (' + (f.type || 'n/a') + ') - ' +
                f.size + ' bytes, last modified: ' +
                (f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a') +
                '</li></ol>');
  console.log(f);
  $('#fileList').append($output);
}



// <input type="file" id="files" name="files[]" multiple />
// <output id="fileList"></output>

// <script>

// </script>








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