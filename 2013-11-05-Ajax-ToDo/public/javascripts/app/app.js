$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('form#priority').on('submit', submitPriority);
  $('form#todo').on('submit', submitToDo);

}

function submitPriority(event){
  submitAjaxForm(this, event, function(data,status, jqXHR){
    htmlAddPriority(data);
  });
}


function submitToDo(event){
  submitAjaxForm(this, event, function(data, status, jqXHR){
    htmlAddToDO(data);
  });
}


function submitAjaxForm(ths, event, successFn){
  var url = $(ths).attr('action');
  var type = $(ths).attr('method').toUpperCase();
  var data = $(ths).serialize();
  var options = {};
  options.url = url;
  options.type = type;
  options.data = data;
  options.success = successFn;
  options.error = function(jqXHR, status, error){
    console.log('failure');
    console.log(error);
  };
  $.ajax(options);
  event.preventDefault();
}


function htmlAddPriority(priority){
  var $option = $('<option>');
  $option.val(priority.id);
  $option.text(priority.name);
  $('#priority-select').append($option);
  $('#priority input').val('');
  $('#priority input[name="name"]').focus();

}

function htmlAddToDO(todo){
  console.log(todo);
  var $tr = $('<tr><td class="title"></td><td class="dueDate"></td><td class="priority"></td></tr>');
  $tr.css('background-color', todo.priority.color);
  $tr.children('.title').text(todo.title);
  $tr.children('.dueDate').text(todo.dueDate);
  $tr.children('.priority').text(todo.priority.name);
  $('#todos tbody').append($tr);
  $('#todo input').val('');
  $('#todo #priority-select').val('default');
  $('#todo input[name="title"]').focus();
}