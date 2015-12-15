jQuery(document).ready(function($) {

var opts = {
  controlNavigation: 'thumbnails',
  imageScaleMode: 'fill',
  arrowsNav: true,
  controlsInside: true,
  arrowsNavHideOnTouch: false,
  loop: false,
  thumbs: {
    firstMargin: false,
    paddingBottom: 0,
    fitInViewport: false
  },
  transitionType: 'fade',
  numImagesToPreload: 3,
  thumbsFirstMargin: false,
  keyboardNavEnabled: true,
  navigateByClick: false,
  fadeinLoadedSlide: true,
  fadeIn: true
};

var $slider = $(".royalSlider");
var slider = $slider.data('royalSlider');

if ($.rsModules) {

  $.rsModules.fadeIn = function() {
    var self = this;
    if (self.st.fadeIn) {
      $slider.removeClass('hidden');
      $slider.css({
        "opacity": 1
      });
    }
  };

  $slider.royalSlider(opts);

}

});
