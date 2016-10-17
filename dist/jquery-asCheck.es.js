/**
* jQuery asCheck v0.2.2
* https://github.com/amazingSurge/jquery-asCheck
*
* Copyright (c) amazingSurge
* Released under the LGPL-3.0 license
*/
import $ from 'jquery';

/* eslint no-empty-function: "off" */
var DEFAULTS = {
  namespace: 'asCheck',
  skin: null,

  disabled: false
};

const NAMESPACE$1 = 'asCheck';

/**
 * Plugin constructor
 **/
class asCheck {
  constructor(input, options = {}) {
    this.$input = $(input);

    this.options = $.extend({}, DEFAULTS, options, this.$input.data());
    this.namespace = this.options.namespace;
    this.type = this.$input.attr('type');

    this.checked = this.$input.prop('checked');
    this.disabled = this.$input.prop('disabled') || this.options.disabled;

    this.classname = {
      checked: `${this.namespace}_checked`,
      disabled: `${this.namespace}_disabled`,
      hover: `${this.namespace}_hover`
    };

    this.initialized = false;

    if (this.options.group === undefined) {
      this.options.group = this.$input.attr('name');
    }

    if (this.type === 'radio') {
      this.$group = $(`input[name="${this.options.group}"]`);
    }

    const _id = this.$input.attr('id');

    if (_id) {
      this.$label = $(`label[for="${_id}"]`);
    } else {
      this.$label = null;
    }

    this._trigger('init');
    this.init();
  }

  init() {
    const tpl = `<span class="${this.namespace}"></span>`;

    this.$check = $(tpl);
    this.$input.css({
      display: 'none'
    }).after(this.$check);

    if (this.type === 'radio') {
      this.$check.addClass(`${this.namespace}_radio`);
    } else {
      this.$check.addClass(`${this.namespace}_checkbox`);
    }

    if (this.options.skin !== null) {
      this.$check.addClass(`${this.namespace}_${this.options.skin}`);
    }

    this.set('checked', this.checked);
    this.set('disabled', this.disabled);

    this._bindEvents();

    this.initialized = true;
    this._trigger('ready');
  }

  _bindEvents(){
    const that = this;

    this.$check.add(this.$label).on(this._eventName('click'), () => {
      if (that.disabled === true) {
        return false;
      }

      that.toggle(that.type);
      return false;
    });

    this.$check.add(this.$label).on(this._eventName('mouseenter'), () => {
      if (that.disabled === true) {
        return false;
      }
      that.$check.add(that.$label).addClass(that.classname.hover);
      return false;
    }).on(this._eventName('mouseleave'), () => {
      if (that.disabled === true) {
        return false;
      }

      that.$check.add(that.$label).removeClass(that.classname.hover);
      return false;
    });
  }

  _eventName(events) {
    if (typeof events !== 'string' || events === '') {
      return `.${this.options.namespace}`;
    }
    events = events.split(' ');

    let length = events.length;
    for (let i = 0; i < length; i++) {
      events[i] = `${events[i]}.${this.options.namespace}`;
    }
    return events.join(' ');
  }

  _trigger(eventType, ...params) {
    let data = [this].concat(params);

    // event
    this.$input.trigger(`${NAMESPACE$1}::${eventType}`, data);

    // callback
    eventType = eventType.replace(/\b\w+\b/g, (word) => {
      return word.substring(0, 1).toUpperCase() + word.substring(1);
    });
    let onFunction = `on${eventType}`;

    if (typeof this.options[onFunction] === 'function') {
      this.options[onFunction].apply(this, params);
    }
  }

  toggle(type) {
    if (type === 'radio') {
      if (this.checked === true) {
        return;
      }

      this.$group.each((i, v) => {
        if ($(v).is(':checked')) {

          $(v).asCheck('set', 'checked', false);
        }
      });
      this.set('checked', true);
    } else {
      /* eslint no-lonely-if: "off" */
      if (this.checked === true) {
        this.set('checked', false);
      } else {
        this.set('checked', true);
      }
    }
  }

  set(state, value) {
    switch (state) {
      case 'checked':
        if (value === true) {
          this.checked = value;
          this.$check.addClass(this.classname.checked);
          this.$input.prop('checked', true);

          if(this.initialized) {
            this._trigger('change', this.checked);
          }
        } else {
          this.checked = value;
          this.$check.removeClass(this.classname.checked);
          this.$input.prop('checked', false);

          if (this.type === 'checkbox') {
            if(this.initialized) {
              this._trigger('change', this.checked);
            }
          }
        }
        break;
      case 'disabled':
        if (value) {
          this.disabled = value;
          this.enabled = false;
          this.$check.addClass(this.classname.disabled);
          this.$input.prop('disabled', true);
        }
        if (!value) {
          this.disabled = value;
          this.enabled = true;
          this.$check.removeClass(this.classname.disabled);
          this.$input.prop('disabled', false);
        }
        break;
      default:
        break;
    }
  }

  get() {
    return this.$input.prop('checked');
  }

  check() {
    this.set('checked', true);
    return this;
  }

  uncheck() {
    this.set('checked', false);
    return this;
  }

  enable() {
    this.set('disabled', true);
    this._trigger('enable');
    return this;
  }

  disable() {
    this.set('disabled', false);
    this._trigger('disable');

    return this;
  }

  destroy() {
    this.$check.remove();
    this._trigger('destroy');
  }

  static setDefaults(options) {
    $.extend(DEFAULTS, $.isPlainObject(options) && options);
  }
}

var info = {
  version:'0.2.2'
};

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
