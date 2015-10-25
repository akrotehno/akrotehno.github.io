(function($) {

  var inputAmount = $('#inputAmount');
  var viewAmount = $('#viewAmount');

  $('input[type=range]').on('input', function () {
    $(this).trigger('change');
});

  inputAmount.change(function () {
     var newValue = inputAmount.val();
     viewAmount.val(newValue);
  });

  viewAmount.change(function () {
     var newValue = viewAmount.val();
     inputAmount.val(newValue);
  });

})(jQuery);
