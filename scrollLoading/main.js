(function($){

  // Image scroll loading
  $('.main-body-content img').each(function() {
    var jThis = $(this);
    if(jThis.attr('no-scroll-loading')){
      return;
    }
    jThis.attr('data-url', jThis.attr('src'));
    jThis.removeAttr('src');
    jThis.addClass('scrollLoading');
    jThis.wrap('<div class="scrollLoading-wrap"></div>');
  });

  var imgCount,
      timer = setInterval(function () {
        if(imgCount <= 0)
          clearInterval(timer);
        isLoaded();
      }, 500);

  var isLoaded = function () {
    $('.scrollLoading').each(function (i, img) {
      if($(this).height() > 0 && $(this).parents('.scrollLoading-wrap').length)
        $(this).unwrap();
    });
    imgCount = $('.scrollLoading-wrap').length;
  }

  $('.scrollLoading').scrollLoading();

})(jQuery);