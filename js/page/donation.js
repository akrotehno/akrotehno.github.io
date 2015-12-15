// We generated a client token for you so you can test out this code
// immediately. In a production-ready integration, you will need to
// generate a client token on your server (see section below).

jQuery(document).ready(function($) {

  var domain = "http://localhost:8989";
  var dropinContainer = $('#dropin-container');

  $.getJSON(domain + "/client_token", function(data) {

    var clientToken = data.token;

    if(!clientToken){
      console.error('No client Token',data);
      return;
    }

    function init(){

      braintree.setup(clientToken, "dropin", {
        container: "dropin-container",
        onReady: function() {
        },
        paymentMethodNonceReceived: function (event, nonce) {

          var $processing = $('[data-remodal-id=processing-payment]');

          var $result = $('[data-remodal-id=result-payment]');
          var $success = $result.find('.success');
          var $error = $result.find('.error');

          var modalResult = $result.remodal({});

          var modalProcessing = $processing.remodal({
            closeOnOutsideClick: false,
            closeOnEscape: false,
            closeOnCancel: false,
            closeOnConfirm: false
          });
          
          modalProcessing.open();
          
          $('#donation-form').append("<input type='hidden' name='payment_method_nonce' value='" + nonce + "'></input>");
          $('#dropin-container').empty();
          
          init();

          ///////////////////////////////////////////////////////
          // MAKE THE AJAX CALL
          ///////////////////////////////////////////////////////
          
          var id = dropinContainer.attr('for');
          var form = $('#'+id);

          var $inputs = form.find(':input');
          console.log($inputs);

          var values = {};

          $inputs.each(function() {
            if(!this.name){
              return;
            }
            values[this.name] = $(this).val();
          });

          // CHECK FOR RECAPTCHA

          var gRec = form.find( "g-recaptcha" );
          if(gRec.length){
            values.response = gRecaptcha.getResponse();
            values.secret = gRec.attr('data-sitekey');
          }

          var url = form.attr( 'endpoint' );

          ///////////////////////////////////////////////////////
          // POSR INFORMATION TO API SERVER
          ///////////////////////////////////////////////////////

          jQuery.post(url,values,function(data){

            modalResult.open();

            if(data.success){
              $success.removeClass('hidden');
              return;
            }

            $error.removeClass('hidden');

          });

        }
      });

}

init();

});

});
