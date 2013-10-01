$(document).ready(initialize);

function initialize(){
  var clicks = 0;
  $('#button1').click(function(){
    clicks++;

    $('#green').css({'background-color':'lightgreen','height':(5*clicks)+'px','overflow':'hidden'});
  });
  // debugger;
  $('#name_btn').click(function(){
    var names = $('#name_txt').val().split(' ');
    names = names.join("");
    $('#display').text(names.length);
  });


}