(function($) {

  //////////////////////////////////////////
  // STPES

  var type_options = $("#types .option");
  var ratings = $("#ratings");

  type_options.click(function(){
    ratings.removeClass('hidden');
  });

  var rating_options = $("#ratings .option");
  var details = $("#details");

  rating_options.click(function(){
    details.removeClass('hidden');
  });

  //////////////////////////////////////////
  // SPONSORSHIP SELECTION

  var options = $('.options');
  options.each(function(idx,elm) {
    var $elm = $(elm);
    var options = $elm.find('.option');
    var id = $elm.attr('id');
    options.click(function() {
    var $elm = $(this);
    options.removeClass('act');
    $elm.addClass('act');

    switch(id){
      case "sponsorships":
      updateStars($elm);
      break;
      case "types":
      break;
    }
    })
  });

  //////////////////////////////////////////
  // Amount Adjustment

  var sliderAmount = $('#sliderAmount');
  var viewAmount = $('#viewAmount');

  $('input[type=range]').on('input', function() {
    $(this).trigger('change');
  });

  sliderAmount.change(function() {
    var newValue = sliderAmount.val();
    viewAmount.val(newValue);
  });

  viewAmount.change(function() {
    var newValue = viewAmount.val();
    sliderAmount.val(newValue);
  });

  //////////////////////////////////////////
  // Stars Adjustment

  var cpbNumber = $('#cpb-number');
  var starNumber = $('#star-number');
  var sliderStars = $('#sliderStars');
  var sponsorStars = $("#sponsor-stars").children();
  var cpbs = $('.det-cont');

  var indLeft = $('#am-range .left .am');
  var indRight = $('#am-range .right .am');

  function updateStars($elm) {

    var value = parseInt($elm.attr('idx'));
    var cpb = $elm.attr('cpb');

    sponsorStars.removeClass("full");

    sponsorStars.each(function(i) {
      var $this = $(this);
      if (i <= value) {
        $this.addClass("full");
      }
    });

    cpbNumber.html(cpb);
    starNumber.html(parseInt(value)+1);

    var star = $(sponsorStars[value]);

    var max = star.attr('max-amount');
    sliderAmount.attr("max",max);
    viewAmount.attr("max",max);
    indRight.html(max);

    var min = star.attr('min-amount');
    sliderAmount.attr("min",min);
    viewAmount.attr("min",min);
    indLeft.html(min);

    sliderAmount.val(min);
    sliderAmount.change();

    //////////////////////////////////////////
    // Capabilities

    cpbs.addClass('hidden');
    cpbs.each(function(idx,elm) {
      var $elm = $(elm);
      var idx = parseInt($elm.attr('idx'));
      if(value>=idx){
    $elm.removeClass('hidden');
      }
    })

  }

})(jQuery);
