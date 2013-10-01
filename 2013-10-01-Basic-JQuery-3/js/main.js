function add(num1, num2){
  return num1 + num2;
}
function subtract(num1, num2){
  return num1 - num2;
}
function multiply(num1, num2){
  return num1 * num2;
}
function divide(num1, num2){
  return num1 / num2;
}
function operate(operator){
  $('#operator').text(operator);
    var num1 = parseFloat($('#num1').val());
    var num2 = parseFloat($('#num2').val());
    var answer;
    switch (operator)
    {
      case '+':
        answer = add(num1,num2);
        break;
      case '-':
        answer = subtract(num1,num2);
        break;
      case '*':
        answer = multiply(num1,num2);
        break;
      case '/':
        answer = divide(num1,num2);
        break;
      default:

    }
    $('#ans').text(answer);
}
$(document).ready(function(){

  $('#add').click(function(){
    operate('+');
  });

  $('#subtract').click(function(){
    operate('-');
  });

  $('#multiply').click(function(){
    operate('*');
  });

  $('#divide').click(function(){
    operate('/');
  });

});