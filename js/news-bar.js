(function($) {

    baseClass = 'main-body-header.news';
    var container = $(baseClass);

    var announcements = JSON.parse(jsonNews);
    console.log(announcements);

    var active = $(baseClass+' .active');
    var down = $(baseClass+' .down');

    if (!announcements.length) {
        return;
    }

    active.text(announcements[0].title);

    if (announcements.length > 1) {

        down.text(announcements[1].title);

        var index = 1;

        function doScroll() {


            setTimeout(function() {

                var active = $(baseClass+' .active');
                var down = $(baseClass+' .down');

                down.removeClass('down');
                down.addClass('active');
                active.addClass('up');

                setTimeout(function() {

                    active.remove();

                    index++;
                    if (index >= announcements.length) {
                        index = 0;
                    }
                    var entry = announcements[index];

                    container.append('<h1 class="down">' + entry.title + '</h1>');
                    setTimeout(doScroll, 5000);
                }, 1000);

            }, 5000);

        }

        doScroll();

    }


})(jQuery);
