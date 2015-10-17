// ParsleyConfig definition if not already set
window.ParsleyConfig = window.ParsleyConfig || {};
window.ParsleyConfig.i18n = window.ParsleyConfig.i18n || {};

ParsleyConfig.excluded = 'input[type=button], input[type=submit], input[type=reset]';
ParsleyConfig.inputs = 'input, textarea, select, input[type=hidden], :hidden';

// Define then the messages
window.ParsleyConfig.i18n.en = jQuery.extend(window.ParsleyConfig.i18n.en || {}, {
  defaultMessage: "Invalid",
  type: {
    email: "Invalid Email",
    url: "Invalid Url",
    number: "Invalid Number",
    integer: "Invalid Integer",
    digits: "Invalid Digits",
    alphanum: "Invalid Alphanumeric"
  },
  password: 'Invalid Password',
  recaptcha: 'No Recaptcha',
  notblank: "Blank",
  required: "Required",
  pattern: "Invalid",
  min: "Is Less",
  max: "Is More",
  range: "Out of Range",
  minlength: "Too Short",
  maxlength: "Too Long",
  length: "Invalid Length",
  mincheck: "Is Less",
  maxcheck: "Is More",
  check: "Out of Range",
  equalto: "Not Equal"
});

// If file is loaded after Parsley main file, auto-load locale
if ('undefined' !== typeof window.ParsleyValidator)
  window.ParsleyValidator.addCatalog('en', window.ParsleyConfig.i18n.en, true);
