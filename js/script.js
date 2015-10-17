jQuery(document).ready(function($) {

  (function() {
    var win = $(window);
    var main = $("#main");
    var gap = 20;
    var min = 500;

    function main_minHeight() {
      console.log
      var v = win.height() - $("#footer").height() - main.offset().top;
      v = v < min ? min : v;
      main.css('min-height', v + 'px');
    }

    win.resize(main_minHeight);
    main_minHeight();

  })();

  (function() {
    var bottom;
    var f_outer = $("#footer-outer");


    function footer_scroll() {
      var footer_height = $("#footer").height();
      if ($(window).scrollTop() + $(window).height() > $(document).height() - footer_height) {
        if (!bottom) {
          //console.log("bottom!");
          f_outer.addClass('footer-sticky');
        }
        bottom = true;
      } else {
        if (bottom) {
          f_outer.removeClass('footer-sticky');
        }
        bottom = false;
      }
    }

    $(window).scroll(footer_scroll);
    footer_scroll();

  })();

  // Nav menu toggle

  $('.top-level-menu').on('click touchstart', function(e) {
    e.stopPropagation();
    $('.top-level-menu.menu-visible').removeClass('menu-visible');
    $(this).addClass('menu-visible');
    console.log('hello');
  });

  // Share
  $('body').on('click touchstart', function() {
    $('.top-level-menu.menu-visible').removeClass('menu-visible');
  }).on('click', '.article-share-link', function(e) {
    e.stopPropagation();

    var $this = $(this),
      url = $this.attr('data-url'),
      encodedUrl = encodeURIComponent(url),
      id = 'article-share-box-' + $this.attr('data-id'),
      offset = $this.offset();

    if ($('#' + id).length) {
      var box = $('#' + id);

      if (box.hasClass('on')) {
        box.removeClass('on');
        return;
      }
    } else {
      var html = [
        '<div id="' + id + '" class="article-share-box">',
        '<input class="article-share-input" value="' + url + '">',
        '<div class="article-share-links">',
        '<a href="https://twitter.com/intent/tweet?url=' + encodedUrl + '" class="article-share-twitter" target="_blank" title="Twitter"></a>',
        '<a href="https://www.facebook.com/sharer.php?u=' + encodedUrl + '" class="article-share-facebook" target="_blank" title="Facebook"></a>',
        '<a href="http://pinterest.com/pin/create/button/?url=' + encodedUrl + '" class="article-share-pinterest" target="_blank" title="Pinterest"></a>',
        '<a href="https://plus.google.com/share?url=' + encodedUrl + '" class="article-share-google" target="_blank" title="Google+"></a>',
        '</div>',
        '</div>'
      ].join('');

      var box = $(html);

      $('body').append(box);
    }

    $('.article-share-box.on').hide();

    box.css({
      top: offset.top + 25,
      left: offset.left
    }).addClass('on');
  }).on('click', '.article-share-box', function(e) {
    e.stopPropagation();
  }).on('click', '.article-share-box-input', function() {
    $(this).select();
  }).on('click', '.article-share-box-link', function(e) {
    e.preventDefault();
    e.stopPropagation();

    window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
  });

  var openClose = $('a.open-close');
  openClose.click(function() {
    this.closed = this.closed ? true : false;
    this.closed = !this.closed;
    var jThis = $(this);
    var jParent = jThis.closest('.isotope-item');
    console.log('on click');
    if (this.closed) {
      jParent.addClass("collapsed");
    } else {
      jParent.removeClass("collapsed");
    }
  });

  var opts = {
    controlNavigation: 'thumbnails',
    imageScaleMode: 'fill',
    arrowsNav: true,
    controlsInside: true,
    arrowsNavHideOnTouch: false,
    loop: false,
    thumbs: {
      firstMargin: false,
      paddingBottom: 0
    },
    transitionType: 'fade',
    numImagesToPreload: 3,
    thumbsFirstMargin: false,
    keyboardNavEnabled: true,
    navigateByClick: false,
    fadeinLoadedSlide: true,
    fadeIn: true
  };

  var slider = $(".royalSlider").data('royalSlider');

  if ($.rsModules) {

    $.rsModules.fadeIn = function() {
      var self = this;
      if (self.st.fadeIn) {
        $(".royalSlider").css({
          "opacity": 1
        });
      }
    };

    $(".royalSlider").royalSlider(opts);

  }




});
