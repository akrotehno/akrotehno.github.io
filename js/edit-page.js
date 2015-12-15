(function($) {

  var editElms = $('p, div, span, h1, h2, h3, h4, h5, h6');
  var selected;

  editElms.click(onClick);

  $(document).click(function(e) {
    if (selected && e.target != selected.elm) {
      deselect();
    }
  })

  function onClick(e) {

    $this = $(this);

    var textLength = $this.text().length;
    if ($this.children().length || (textLength <= 1)) {
      return;
    }

    e.stopPropagation();

    if (selected) {

      var parent = $(selected.elm).parent();
      if (parent[0] == this) {
        return;
      }

      deselect();
    }

    var attrs = {};

    $.each(this.attributes, function(idx, attr) {
      attrs[attr.nodeName] = attr.nodeValue;
    });

    selected = {
      attrs: attrs,
      tag: this.tagName.toLowerCase()
    };

    var $elm = changeTag(this, "textarea",attrs);
    selected.elm = $elm[0];

  }

  function deselect() {
    var selectedElm = changeTag(selected.elm, selected.tag,selected.attrs);
    selectedElm.click(onClick);
    selected = null;
  }

  function changeTag(elm, tag, attrs) {

    $elm = $(elm);

    var newContent = $("<" + tag + " />", attrs);
    newContent.attr('spellcheck','true');
    newContent.append($elm.contents());
    $elm.replaceWith(newContent);
    newContent.elastic();
    newContent.focus();

    return newContent;
  }

})(jQuery);
