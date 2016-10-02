import $ from 'jquery';
import asCheck from './asCheck';
import info from './info';

const NAMESPACE = 'asCheck';
const OtherAsCheck = $.fn.asCheck;

const jQueryAsCheck = function(options, ...args) {
  if (typeof options === 'string') {
    const method = options;

    if (/^_/.test(method)) {
      return false;
    } else if ((/^(get)/.test(method))) {
      const instance = this.first().data(NAMESPACE);
      if (instance && typeof instance[method] === 'function') {
        return instance[method](...args);
      }
    } else {
      return this.each(function() {
        const instance = $.data(this, NAMESPACE);
        if (instance && typeof instance[method] === 'function') {
          instance[method](...args);
        }
      });
    }
  }

  return this.each(function() {
    if (!$(this).data(NAMESPACE)) {
      $(this).data(NAMESPACE, new asCheck(this, options));
    }
  });
};

$.fn.asCheck = jQueryAsCheck;

$.asCheck = $.extend({
  setDefaults: asCheck.setDefaults,
  noConflict: function() {
    $.fn.asCheck = OtherAsCheck;
    return jQueryAsCheck;
  }
}, info);
