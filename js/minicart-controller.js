(function($) {

    var debug = true;
    var domain = debug ? 'localhost:8080' : 'api-akrotehno.rhcloud.com';

    var product_page = $('#product_page');
    if (product_page.length) {
        var item_id = product_page.attr('item-id');
        var url = 'http://' + domain + '/get-item?id=' + item_id;
        $.ajax({
            url: url,
            jsonp: "callback",
            dataType: "jsonp",
            success: onItemData,
            complete: onCallComplete
        });
    }

    var navCart = $('#nav-cart a');

    navCart.click(function() {
        setTimeout(function() {
            paypal.minicart.view.show();
        }, 100);
    });

    function getTotalCount() {

        var items = paypal.minicart.cart.items();
        totalCount = 0;

        for (var i in items) {
            var item = items[i];
            totalCount += item._data.quantity;
        }

        navCart.text('(' + totalCount + ')');
    }

    paypal.minicart.cart.on('add', getTotalCount);
    paypal.minicart.cart.on('remove', getTotalCount);
    $('#cart').bind('onQuantityChange', getTotalCount);
    getTotalCount();

    function onCallComplete() {
        $('.cover_card.cart_add').removeClass('loading');
        $('.circle_loader').removeClass('loading');
    }

    function onItemData(saasu_data) {

        //console.log(saasu_data);

        $('#item_price').html(saasu_data.amount);
        $('#det-code').html(saasu_data.Code);

        $('.cart_add').each(function(index, element) {

            var thumb_url = product_page.attr('thumb-url');
            console.log(thumb_url);

            var cart_add = $(element);
            cart_add.click(function() {

                var minicart_data = {
                    item_name: saasu_data.Code,
                    thumb_url: thumb_url,
                    item_description: saasu_data.Description,
                    item_description: saasu_data.Description,
                    amount: saasu_data.amount,
                    data_quantity: saasu_data.quantity,
                    uid: item_id
                }

                paypal.minicart.akrotehno.add(minicart_data);

                setTimeout(function() {
                    paypal.minicart.view.show();
                }, 100);
            });
        });
    }

})(jQuery);
