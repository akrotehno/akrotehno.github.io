(function($) {

    var timeline_cont = $('#timeline-jquery');
    var uid = timeline_cont.attr('team-uid');

    $.getJSON("/json/team/" + uid + ".json", function(data) {

        timeline_cont.verticalTimeline({
            data: data,
            handleResize: true
        });

    });

})(jQuery);
