(function() {

  window.onRecaptchaForm = function() {

    var form = $($('.g-recaptcha').closest('.form')[0]);
    var blockNum = $(form.children()[0]).attr("block");
    var res = form.parsley().validate('block'+blockNum);
  }

  $(document).ready(function() {

    var fields = $('.form .field');

    window.Parsley.on('field:success', function() {
      var jThis = this.$element;
      jThis.parent('li').removeClass('has-error');
      jThis.parent('li').addClass('has-success');
    });

    window.Parsley.on('form:submit', function(evt,formInstance) {
    });

    window.Parsley.on('field:error', function() {
      var jThis = this.$element;
      jThis.parent('li').addClass('has-error');
      jThis.parent('li').removeClass('has-success');
    });

    $('.form input').on("focus", function() {
      var jThis = $(this);
      fields.removeClass('has-focus');
      jThis.parent('li').addClass('has-focus');
    });

  });

})();
