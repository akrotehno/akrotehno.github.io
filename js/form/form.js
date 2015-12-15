(function() {

  window.onRecaptchaForm = function() {

    var form = $($('.g-recaptcha').closest('.form')[0]);
    var blockNum = $(form.children()[0]).attr("block");
    var res = form.parsley().validate('block' + blockNum);
  }

  $(document).ready(function() {

    $('.form').submit(function(event) {
      event.preventDefault();
    })

    var fields = $('.form .field');

    window.Parsley.on('field:success', function() {

      var jThis = this.$element;
      jThis.closest('li').removeClass('has-error');
      jThis.closest('li').addClass('has-success');

    });

    window.Parsley.on('field:error', function() {
      var jThis = this.$element;
      jThis.closest('li').addClass('has-error');
      jThis.closest('li').removeClass('has-success');
    });

    $('.form input').on("focus", function() {
      var jThis = $(this);
      fields.removeClass('has-focus');
      jThis.closest('li').addClass('has-focus');
    });

  });

})();
