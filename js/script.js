(function($) {

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

    // Caption
    $('.article-entry').each(function(i) {
        $(this).find('img').each(function() {
            if ($(this).parent().hasClass('fancybox')) return;

            var alt = this.alt;

            if (alt) $(this).after('<span class="caption">' + alt + '</span>');

            $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox"></a>');
        });

        $(this).find('.fancybox').each(function() {
            $(this).attr('rel', 'article' + i);
        });
    });

    if ($.fancybox) {
        $('.fancybox').fancybox({
            openEffect: 'none',
            padding: 2,
            margin: 4,
            slideWidth: 230,
            minWidth: 350,
            minHeight: 350,
            autoResize: true,
            closeEffect: 'none',
            prevEffect: 'none',
            nextEffect: 'none',
            wrapCSS: 'productviewer',
            closeBtn: false,
            arrows: true,
            nextClick: true,
            helpers: {
                title: {
                    type: 'inside'
                },
                buttons: {},
                thumbs: {
                    width: 50,
                    height: 50
                }
            },
            afterLoad: function() {

                this.title = '<a target="_blank" href="' +
                    this.href.replace("press_web", "download").replace("_web.jpg", ".jpg.zip") +
                    '" download>Download</a> ';

            }
        });
    }

    //Back to top
    $("#back-to-top").on('click', function() {
        $('body,html').animate({
            scrollTop: 0
        }, 600);
    });

    var slider_more = $("#slider_more");
    if (slider_more.length) {
        slider_more.lightSlider({
            item: 4,
            loop: false,
            autoWidth: true,
            slideMove: 2,
            easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
            speed: 600,
            responsive: [{
                breakpoint: 800,
                settings: {
                    item: 3,
                    slideMove: 1,
                    slideMargin: 6,
                }
            }, {
                breakpoint: 480,
                settings: {
                    item: 2,
                    slideMove: 1
                }
            }]
        });
    }

    var slider_cont = $("#lightSlider");
    var timeoutPlay;
    var timeSlide = 10000;

    if (slider_cont.length) {

        var slider = slider_cont.lightSlider({
            item: 1,
            autoWidth: false,
            slideMove: 1, // slidemove will be 1 if loop is true
            slideMargin: 0,

            addClass: '',
            mode: "slide",
            useCSS: true,
            cssEasing: 'ease', //'cubic-bezier(0.25, 0, 0.25, 1)',//
            easing: 'linear', //'for jquery animation',////

            speed: 600, //ms'
            auto: false,
            loop: false,
            slideEndAnimation: false,
            pause: timeSlide,

            keyPress: false,
            controls: true,
            prevHtml: '',
            nextHtml: '',

            rtl: false,
            adaptiveHeight: false,

            vertical: false,
            verticalHeight: 500,
            vThumbWidth: 100,

            thumbItem: 10,
            pager: true,
            gallery: false,
            galleryMargin: 5,
            thumbMargin: 5,
            currentPagerPosition: 'middle',

            enableTouch: true,
            enableDrag: true,
            freeMove: true,
            swipeThreshold: 70,

            responsive: [],

            onAfterSlide: function(el) {
                currSlide = el;
                checkLast();
            },
            onSliderLoad: function() {
                slider_cont.fadeTo(400, 1);
            }
        });

        var autoplay = true;
        var currSlide;

        function checkLast() {
            if (!currSlide) {
                return;
            }
            var count = currSlide.getCurrentSlideCount();
            var total = currSlide.getTotalSlideCount();
            if (total > 1 && count == total) {
                clearTimeout(timeoutPlay);
                timeoutPlay = window.setTimeout(function() {
                    slider.goToSlide(0);
                }, timeSlide);

            }
        }

        if (autoplay) {
            slider_cont.parent().on('mouseenter', function() {
                clearTimeout(timeoutPlay);
                slider.pause();
            });
            slider_cont.parent().on('mouseleave', function() {
                clearTimeout(timeoutPlay);
                timeoutPlay = window.setTimeout(function() {
                    slider.play();
                    checkLast();
                }, timeSlide);
            });
            timeoutPlay = window.setTimeout(function() {
                slider.play();
            }, timeSlide);
        }

    }

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

})(jQuery);
