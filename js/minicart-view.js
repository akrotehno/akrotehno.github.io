paypal.minicart.akrotehno = {
    add: function(_data) {

        var amount = parseFloat(_data.amount);

        var data = {
            item_name: _data.item_name,
            item_description: _data.item_description,
            amount: _data.amount,
            currency_code: "EUR",
            uid: _data.uid,
            thumb_url: _data.thumb_url
        }

        var quantity = _data.data_quantity;
        var quantity_int = parseInt(quantity);

        //console.log(data.item_name+':');
        //console.log(quantity);
        //console.log(quantity_int);

        if (quantity === quantity_int) {

            data.data_quantity = quantity_int;
            data.on0 = 'in stock';
            data.os0 = quantity_int;
        }

        paypal.minicart.cart.add(data);
    }
};



(function($) {

    var processing = false;

    var url_getPayment = 'http://localhost:8080/get-payment';
    var spinner, submitText;

    var j_cart = $('#cart');
    var cart_elm = j_cart[0];
    paypal.minicart.render({
        parent: cart_elm
    });

    function onItemChange(product, idx, use_api) {

        var input = $('.minicart-quantity[data-minicart-idx="' + idx + '"]');

        var quantity = input.val();
        var quantity_max = product.get('data_quantity');
        var value;

        if (quantity > quantity_max) {
            value = quantity_max;
        }
        if (quantity < 1) {
            value = 1;
        }

        if (value) {
            if (use_api) {
                product.set('quantity', value);
            } else {
                input.val(value);
            }
        }

        j_cart.trigger('onQuantityChange');

    }

    window.onItemInputChange = function(idx) {
        var product = paypal.minicart.cart._items[idx];
        onItemChange(product, idx);
    }

    paypal.minicart.cart.on('add', function(idx, product, isExisting) {
        onItemChange(product, idx, true);
        console.log(product);
        product.set('item_description', product._data.item_description.split('|').join('\r'));
    });

    window.onCheckoutSubmit = function() {

        if (processing) {
            return false;
        }

        hideMessage();

        spinner = $('.minicart-submit .spinner');
        submitText = $('.minicart-submit .submit-text');

        spinner.show();
        submitText.hide();

        processing = true;

        // PREPARE DATA

        var invoiceData = {};
        var items = [];
        var cart = paypal.minicart.cart;

        for (var i in cart._items) {
            var _item = cart._items[i];
            //console.log(_item._data);

            items.push({
                name: _item._data.item_name,
                description: 'description',
                itemPrice: _item._data.amount,
                itemCount: _item._data.quantity,
                stock: _item._data.data_quantity,
                uid: _item._data.uid
            });
        }

        var invoiceData = {
            items: items
        };

        makeCall(invoiceData, function() {

            console.log('complete');
        });


        return false;
    };

    function hideMessage() {

        var update_button = $('.message-button.message-update');
        update_button.hide();

        var msg_box = $('#PPMiniCart .minicart-messages');
        msg_box.hide();
    }

    function showMessage(message) {

        var update_button = $('.message-button.message-update');
        update_button.hide();

        var msg_a = $('#PPMiniCart .minicart-messages .message-a');
        var msg_b = $('#PPMiniCart .minicart-messages .message-b');

        msg_a.text(message.title);
        msg_b.text(message.text);

        var msg_box = $('#PPMiniCart .minicart-messages');
        msg_box.show();

    }

    function makeCall(invoiceData, callback) {

        $.ajax({
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: url_getPayment,
            jsonp: "callback",
            data: {
                json: JSON.stringify(invoiceData)
            },
            dataType: "jsonp",
            success: onSuccess,
            error: onError
        });

        var payKey = $('#paykey');

        function onError(jqXHR, textStatus, errorThrown) {
            spinner.hide();
            submitText.show();
            showMessage({
                title: 'Server error connection',
                text: 'Could not connect with the api server'
            });
        }

        var onCheckoutData;

        function onSuccess(data) {

            spinner.hide();
            submitText.show();
            onCheckoutData = data;

            //console.log(data);

            processing = false;

            if (data.error) {
                showMessage(data.error);

                switch (data.error_type) {
                    case "update_items":
                        var update_button = $('.message-button.message-update');
                        update_button.off('click');
                        update_button.click(function() {

                            var cart = paypal.minicart.cart;
                            var cart_items = cart.items();

                            while (cart._items.length) {
                                //var cart_item = cart_items[i];
                                cart.remove(0);
                            }

                            setTimeout(function() {
                                for (var i in onCheckoutData.items) {

                                    var saasu_item = onCheckoutData.items[i];

                                    var data = {
                                        item_name: saasu_item.name,
                                        item_description: saasu_item.description,
                                        amount: saasu_item.itemPrice,
                                        uid: saasu_item.uid,
                                        data_quantity: saasu_item.stock
                                    }

                                    paypal.minicart.akrotehno.add(data);

                                    setTimeout(function() {
                                        paypal.minicart.view.show();
                                    }, 200);
                                }
                            }, 200);
                        });

                        update_button.show();
                        //console.log('show');
                        break;
                }

                return;
            }

            payKey.val(data.payKey);
            var embeddedPPFlow = new PAYPAL.apps.DGFlow({
                trigger: 'submitBtn'
            });

            callback();

            $('#submitBtn').click();
        }
    }

})(jQuery);
