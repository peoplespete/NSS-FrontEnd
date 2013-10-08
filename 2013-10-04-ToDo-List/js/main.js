

function addRow(){

  // debugger;

  var $tr = $('<tr>');

  var $TDdueDate = $('<td>');
  $TDdueDate.addClass('dueDate');
  var dueDate = $('#dueDate').val();
  $TDdueDate.text(dueDate);
  $('#dueDate').val('').focus();

  var $TDtask = $('<td>');
  $TDtask.addClass('task');
  var task = $('#task').val();
  $TDtask.text(task);
  $('#task').val('');


  var $TDcolor = $('<td>');
  $TDcolor.addClass('color');
  var color = $('#color').val();
  $TDcolor.css('background-color',color);
  $('#color').val('');


  var $TDdone = $('<td>');
  $TDdone.addClass('done');
  var $checkBox = $('<input>');
  $checkBox.attr({'type':'checkbox','value':''});
  $TDdone.append($checkBox);

  var $TDremove = $('<td>');
  $TDremove.addClass('remove');
  var $remove = $('<input>');
  $remove.attr({'type':'button','value':'Delete'});
  $TDremove.append($remove);

  var $TDupdown = $('<td>');
  $TDupdown.addClass('updown');
  var $up = $('<img>');
  $up.addClass('up');
  $up.attr('src','images/up.png');
  var $down = $('<img>');
  $down.addClass('down');
  $down.attr('src','images/down.png');
  $TDupdown.append($up,$down);


  $tr.append($TDdueDate, $TDtask, $TDcolor, $TDdone, $TDremove, $TDupdown);
  $('table').append($tr);
}

function done(){
  var $done = $(this);
  var $dueDate = $done.parent().prev().prev().prev();
  $dueDate.toggleClass('strike');
  var $task = $done.parent().prev().prev();
  $task.toggleClass('strike');

}

function remove(){
  $(this).parent().parent().remove();
}

function updown(){
  var $selectedRow = $(this).parent().parent();
  if($(this).hasClass('up')){
    if($selectedRow.prev().children('td').length > 0){
      $selectedRow.prev().before($selectedRow);
    }
  }else{
    $selectedRow.next().after($selectedRow);
  }

}

$(document).ready(function(){
  $('#addTask').click(addRow);
  $('table').on('click','.done > input', done);
  $('table').on('click','.remove > input', remove);
  $('table').on('click','.updown > img', updown);

});