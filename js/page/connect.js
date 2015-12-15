(function($) {
  var signinButtons = $('#signin .btn');
  var signinViews = $('#signin-views .view');

  signinButtons.click(function(){
    var signinButton =$(this);

    signinButtons.removeClass('selected');
    signinButton.addClass('selected');

    var attrFor = signinButton.attr('for');

    signinViews.addClass('hidden');
    var signinView = signinViews.filter('[for="'+attrFor+'"]');
    signinView.removeClass('hidden');
  });

  $('#signin .btn[for="view-login"]').click();

})(jQuery);
