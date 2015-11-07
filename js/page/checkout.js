// We generated a client token for you so you can test out this code
// immediately. In a production-ready integration, you will need to
// generate a client token on your server (see section below).

(function($) {

  var items = paypal.minicart.cart.items();

  if(!items.length){
    $("#form-empty").removeClass("hidden");
    return;
  }

  var domain = "http://localhost:3232";
  var checkoutFrom = $("#checkout");
  var btnSubmit = $("#checkout-button");

  $("#form-title").removeClass("hidden");

  $.getJSON(domain+"/client_token", function(data) {

    checkoutFrom.removeClass('hidden');
    var clientToken = data.token;

    braintree.setup(clientToken, "dropin", {
      container: "payment-form",
      onReady: function(e) {
        $("#form-title").addClass("hidden");
        $("#form-intro").removeClass("hidden");
        $("#checkout-button").removeClass("hidden");
      }
    });

  });

})(jQuery);
