(function($) {

  var upcoming = $('#upcoming_cont');
  var date_time = upcoming.attr('date_time');

  var next = $('#next_details');
  var no_next = $('#no_next_details');


  if(!date_time){
    no_next.removeClass('hidden');
    return;
  }

  var selectedDate = new Date(date_time);
  var now = new Date();


  if (selectedDate < now) {
    no_next.removeClass('hidden');
  } else {
    next.removeClass('hidden');
  }


})(jQuery);
