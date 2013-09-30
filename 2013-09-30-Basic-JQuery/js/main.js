$(document).ready(initialize); //means select html tree and when it is ready do this stuff

function changedivtext(){
  // var name = $('#name').val();
  // $('#b').text(name);
  // $('#b').text($('#name').val());
  // $('#b').css('color',$('#color').val());
  $('#b').text($('#name').val()).css('color',$('#color').val());// you can chain the jquery functions
}
function initialize(){
  // $('div').css('background-color',"lightyellow");
  // $('div').css('font-size','25px');
  // $('div').css('color','darkCyan');

  // var coloridea = prompt("What color do you want your background?");
  // $('div').css('background-color',coloridea);
  // var fontsz = prompt("What size font would you like?");
  // $('div').css('font-size',(fontsz+"px"));
  // var selector = prompt("What div?");
  // var cls = prompt("Class to add?");
  // var newtext = prompt("What would you like to say?");
  // $(selector).addClass(cls);
  // $(selector).text(newtext);

  // var selector_to_hide = prompt("Which node do you want to hide?");
  // $(selector_to_hide).hide();

  $('#clicker').click(changedivtext);

  $('#age_clicker').click(function(){  //this is an inline function
    if(parseInt($('#age').val())>20)
      $('#c').text($('#b').text() + " can drink!").css('background-color','green');
    else
      $('#c').text("Sorry " + $('#b').text() + ", no booz for u").css('background-color','red');
  });

}

