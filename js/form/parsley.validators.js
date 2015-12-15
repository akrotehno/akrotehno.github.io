window.Parsley.addValidator('password',
  function(value, requirement) {
    if (value.length < 7) {
      // TOO SHORT
      return false;
    }

    if (value.length > 128) {
      // TOO SHORT
      return false;
    }

    if (value.search(/\d/) == -1) {
      // NO NUMBER
      return false;
    }

    if (value.search(/[a-zA-Z]/) == -1) {
      // NO LETTER
      return false;
    }
    return true;
  }, 32);

window.Parsley.addValidator('recaptcha',
  function(value, requirement) {
    var res = grecaptcha.getResponse();
    return res?true:false;
  }, 32);
