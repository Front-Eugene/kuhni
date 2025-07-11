document.addEventListener('DOMContentLoaded', function() {
  var phoneInputs = document.querySelectorAll('input[name="phone"]');
  var maskPattern = '+375(__)___-__-__';

  function setCursorPosition(pos, elem) {
    elem.focus();
    if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
    else if (elem.createTextRange) {
      var range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  }

  function mask(event) {
    var matrix = '+375(__)___-__-__',
        i = 0,
        def = matrix.replace(/\D/g, ''),
        val = this.value.replace(/\D/g, '');
    if (def.length >= val.length) val = def;
    this.value = matrix.replace(/./g, function(a) {
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
    });
    if (event.type === 'blur') {
      if (this.value.length < 7) this.value = '';
    } else {
      setCursorPosition(this.value.length, this);
    }
  }

  phoneInputs.forEach(function(input) {
    input.addEventListener('input', mask, false);
    input.addEventListener('focus', mask, false);
    input.addEventListener('blur', mask, false);
  });
});
