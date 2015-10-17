$(document).ready(function() {
  $('.form .btn').on('click', function() {

    var jThis = $(this);
    var form = jThis.closest('.form');
    var current = jThis.data('currentBlock'),
      next = jThis.data('nextBlock');

    // only validate going forward. If current group is invalid, do not go further
    // .parsley().validate() returns validation result AND show errors
    var res = form.parsley().validate('block' + current);

    if(!next){
      // MUST BE THE FINAL SUBMISSION
      return;
    }

    if (next > current) {
      if (false === res) {
        return;
      }
    }

    // validation was ok. We can go on next step.
    $('.form .block' + current)
      .removeClass('show')
      .addClass('hidden');

    $('.form .block' + next)
      .removeClass('hidden')
      .addClass('show');

    $('.steps .block' + current)
      .removeClass('active');

    $('.steps .block' + next)
      .addClass('active');

  });
});
