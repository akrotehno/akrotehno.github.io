
Parsley.addMessages('en', {
  defaultMessage: "Seems to be invalid.",
  type: {
    email:        "Should be a valid email.",
    url:          "Should be a valid url.",
    number:       "Should be a valid number.",
    integer:      "Should be a valid integer.",
    digits:       "Should be digits.",
    alphanum:     "Should be alphanumeric."
  },
  notblank:       "Should not be blank.",
  required:       "This field is required.",
  pattern:        "Seems to be invalid.",
  min:            "Should be greater than or equal to %s.",
  max:            "Should be lower than or equal to %s.",
  range:          "Should be between %s and %s.",
  minlength:      "Too short. It should have %s characters or more.",
  maxlength:      "Too long. It should have %s characters or fewer.",
  length:         "Length is invalid. It should be between %s and %s characters long.",
  mincheck:       "You must select at least %s choices.",
  maxcheck:       "You must select %s choices or fewer.",
  check:          "You must select between %s and %s choices.",
  equalto:        "Should be the same."
});

Parsley.setLocale('en');
