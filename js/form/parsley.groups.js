$(document).ready(function() {
  $('.form .btn').on('click', function(e) {
    var jThis = $(this);
    var form = jThis.closest('.form');
    var current = jThis.data('currentBlock'),
      next = jThis.data('nextBlock');

    // only validate going forward. If current group is invalid, do not go further
    // .parsley().validate() returns validation result AND show errors
    var pForm = form.parsley();
    var res = pForm.validate('block' + current);

    if (!res) {
      return;
    }

    // MUST BE THE FINAL SUBMISSION
    if (!next) {

      var modal = jThis.attr('data-modal');
      if (modal) {
        var inst = $('[data-remodal-id='+modal+']').remodal({
          body:"#remodal-container"
        });
        inst.open();
        return;
      }


      form.submit();
      return;
    }

    // validation was ok. We can go on next step.
    form.find('.block' + current)
      .removeClass('show')
      .addClass('hidden');

    form.find('.block' + next)
      .removeClass('hidden')
      .addClass('show');

    form.find('.steps .block' + current)
      .removeClass('active');

    form.find('.steps .block' + next)
      .addClass('active');

  });
});
