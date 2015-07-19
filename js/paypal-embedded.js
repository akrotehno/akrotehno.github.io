(function($) {

    //Manage the closing of the iframe when payment is executed/canceled
    if (window != top) {
        top.location.replace(document.location);
    }

    var url = 'http://localhost:8080/get-payment';

    function makeCall() {

        $.ajax({
            url: url,
            jsonp: "callback",
            dataType: "jsonp",
            success: onSuccess
        });

        var payKey = $('#paykey');

        function onSuccess(data) {

            console.log(data);

            payKey.val(data.payKey);
            var embeddedPPFlow = new PAYPAL.apps.DGFlow({
                trigger: 'submitBtn'
            });

            $('#submitBtn').click();
        }
    }


})(jQuery);