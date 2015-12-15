jQuery(document).ready(function($) {

  // Main menu toggle

  var navLinks = $('.main-nav-list-link');
  var headerMenu = $('#header-menu');
  var headerMenus = $('#header-menu .menu-entry');

  navLinks.on('click touchstart', function(e) {

    e.stopPropagation();

    var $this = $(this);
    var attrFor = $this.attr('for');
    var menu = headerMenu.find('.menu-entry[for="' + attrFor + '"]');

    if ($this.hasClass('selected')) {
      $this.removeClass("selected");
      menu.addClass('hidden');
      headerMenu.addClass('hidden');
      return;
    }

    navLinks.removeClass('selected');
    headerMenus.addClass('hidden');

    menu.removeClass('hidden');
    $this.addClass("selected");
    headerMenu.removeClass('hidden');

    headerMenu.mCustomScrollbar("destroy");
    headerMenu.mCustomScrollbar({
      axis: 'x'
    });
  });

  ///////////////////////////////////////////////////////
  // OPEN CLOSE
  ///////////////////////////////////////////////////////

  var openClose = $('a.open-close');
  openClose.click(function() {
    this.closed = this.closed ? true : false;
    this.closed = !this.closed;
    var jThis = $(this);
    var jParent = jThis.closest('.isotope-item');
    if (this.closed) {
      jParent.addClass("collapsed");
    } else {
      jParent.removeClass("collapsed");
    }
  });


  ///////////////////////////////////////////////////////
  // CUSTOM SCROLL
  ///////////////////////////////////////////////////////

  $(".custom-sroll-x").mCustomScrollbar({
    axis: "x"
  });

  ///////////////////////////////////////////////////////
  // IMAGE LAZY LOADING
  ///////////////////////////////////////////////////////


  $("img.unveil").unveil(0, function() {
    $this = $(this);
    $this.load(function() {
      this.style.opacity = 1;
      $(this).parent().addClass('loaded');
    });
  });


});
