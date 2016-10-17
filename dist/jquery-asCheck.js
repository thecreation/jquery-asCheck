/**
* jQuery asCheck v0.2.1
* https://github.com/amazingSurge/jquery-asCheck
*
* Copyright (c) amazingSurge
* Released under the LGPL-3.0 license
*/
(function(global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('jquery'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.jQuery);
    global.jqueryAsCheckEs = mod.exports;
  }
})(this,

  function(_jquery) {
    'use strict';

    var _jquery2 = _interopRequireDefault(_jquery);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ?

      function(obj) {
        return typeof obj;
      }
      :

      function(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    var _createClass = function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;

          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      return function(Constructor, protoProps, staticProps) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps);

        if (staticProps)
          defineProperties(Constructor, staticProps);

        return Constructor;
      };
    }();

    /* eslint no-empty-function: "off" */
    var DEFAULTS = {
      namespace: 'asCheck',
      skin: null,

      disabled: false
    };

    var NAMESPACE$1 = 'asCheck';

    /**
     * Plugin constructor
     **/

    var asCheck = function() {
      function asCheck(input) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, asCheck);

        this.$input = (0, _jquery2.default)(input);

        this.options = _jquery2.default.extend({}, DEFAULTS, options, this.$input.data());
        this.namespace = this.options.namespace;
        this.type = this.$input.attr('type');

        this.checked = this.$input.prop('checked');
        this.disabled = this.$input.prop('disabled') || this.options.disabled;

        this.classname = {
          checked: this.namespace + '_checked',
          disabled: this.namespace + '_disabled',
          hover: this.namespace + '_hover'
        };

        this.initialized = false;

        if (this.options.group === undefined) {
          this.options.group = this.$input.attr('name');
        }

        if (this.type === 'radio') {
          this.$group = (0, _jquery2.default)('input[name="' + this.options.group + '"]');
        }

        var _id = this.$input.attr('id');

        if (_id) {
          this.$label = (0, _jquery2.default)('label[for="' + _id + '"]');
        } else {
          this.$label = null;
        }

        this._trigger('init');
        this.init();
      }

      _createClass(asCheck, [{
        key: 'init',
        value: function init() {
          var tpl = '<span class="' + this.namespace + '"></span>';

          this.$check = (0, _jquery2.default)(tpl);
          this.$input.css({
            display: 'none'
          }).after(this.$check);

          if (this.type === 'radio') {
            this.$check.addClass(this.namespace + '_radio');
          } else {
            this.$check.addClass(this.namespace + '_checkbox');
          }

          if (this.options.skin !== null) {
            this.$check.addClass(this.namespace + '_' + this.options.skin);
          }

          this.set('checked', this.checked);
          this.set('disabled', this.disabled);

          this._bindEvents();

          this.initialized = true;
          this._trigger('ready');
        }
      }, {
        key: '_bindEvents',
        value: function _bindEvents() {
          var that = this;

          this.$check.add(this.$label).on(this._eventName('click'),

            function() {
              if (that.disabled === true) {

                return false;
              }

              that.toggle(that.type);

              return false;
            }
          );

          this.$check.add(this.$label).on(this._eventName('mouseenter'),

            function() {
              if (that.disabled === true) {

                return false;
              }
              that.$check.add(that.$label).addClass(that.classname.hover);

              return false;
            }
          ).on(this._eventName('mouseleave'),

            function() {
              if (that.disabled === true) {

                return false;
              }

              that.$check.add(that.$label).removeClass(that.classname.hover);

              return false;
            }
          );
        }
      }, {
        key: '_eventName',
        value: function _eventName(events) {
          if (typeof events !== 'string' || events === '') {

            return '.' + this.options.namespace;
          }
          events = events.split(' ');

          var length = events.length;

          for (var i = 0; i < length; i++) {
            events[i] = events[i] + '.' + this.options.namespace;
          }

          return events.join(' ');
        }
      }, {
        key: '_trigger',
        value: function _trigger(eventType) {
          var _ref;

          for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            params[_key - 1] = arguments[_key];
          }

          var data = (_ref = [this]).concat.apply(_ref, params);

          // event
          this.$input.trigger(NAMESPACE$1 + '::' + eventType, data);

          // callback
          eventType = eventType.replace(/\b\w+\b/g,

            function(word) {
              return word.substring(0, 1).toUpperCase() + word.substring(1);
            }
          );
          var onFunction = 'on' + eventType;

          if (typeof this.options[onFunction] === 'function') {
            var _options$onFunction;

            (_options$onFunction = this.options[onFunction]).apply.apply(_options$onFunction, [this].concat(params));
          }
        }
      }, {
        key: 'toggle',
        value: function toggle(type) {
          if (type === 'radio') {

            if (this.checked === true) {

              return;
            }

            this.$group.each(

              function(i, v) {
                if ((0, _jquery2.default)(v).is(':checked')) {

                  (0, _jquery2.default)(v).asCheck('set', 'checked', false);
                }
              }
            );
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
      }, {
        key: 'set',
        value: function set(state, value) {
          switch (state) {
            case 'checked':

              if (value === true) {
                this.checked = value;
                this.$check.addClass(this.classname.checked);
                this.$input.prop('checked', true);

                if (this.initialized) {
                  this._trigger('change', this.checked);
                }
              } else {
                this.checked = value;
                this.$check.removeClass(this.classname.checked);
                this.$input.prop('checked', false);

                if (this.type === 'checkbox') {

                  if (this.initialized) {
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
      }, {
        key: 'get',
        value: function get() {
          return this.$input.prop('checked');
        }
      }, {
        key: 'check',
        value: function check() {
          this.set('checked', true);

          return this;
        }
      }, {
        key: 'uncheck',
        value: function uncheck() {
          this.set('checked', false);

          return this;
        }
      }, {
        key: 'enable',
        value: function enable() {
          this.set('disabled', true);
          this._trigger('enable');

          return this;
        }
      }, {
        key: 'disable',
        value: function disable() {
          this.set('disabled', false);
          this._trigger('disable');

          return this;
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          this.$check.remove();
          this._trigger('destroy');
        }
      }], [{
        key: 'setDefaults',
        value: function setDefaults(options) {
          _jquery2.default.extend(DEFAULTS, _jquery2.default.isPlainObject(options) && options);
        }
      }]);

      return asCheck;
    }();

    var info = {
      version: '0.2.1'
    };

    var NAMESPACE = 'asCheck';
    var OtherAsCheck = _jquery2.default.fn.asCheck;

    var jQueryAsCheck = function jQueryAsCheck(options) {
      var _this = this;

      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      if (typeof options === 'string') {
        var _ret = function() {
          var method = options;

          if (/^_/.test(method)) {

            return {
              v: false
            };
          } else if (/^(get)/.test(method)) {
            var instance = _this.first().data(NAMESPACE);

            if (instance && typeof instance[method] === 'function') {

              return {
                v: instance[method].apply(instance, args)
              };
            }
          } else {

            return {
              v: _this.each(

                function() {
                  var instance = _jquery2.default.data(this, NAMESPACE);

                  if (instance && typeof instance[method] === 'function') {
                    instance[method].apply(instance, args);
                  }
                }
              )
            };
          }
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object")

          return _ret.v;
      }

      return this.each(

        function() {
          if (!(0, _jquery2.default)(this).data(NAMESPACE)) {
            (0, _jquery2.default)(this).data(NAMESPACE, new asCheck(this, options));
          }
        }
      );
    };

    _jquery2.default.fn.asCheck = jQueryAsCheck;

    _jquery2.default.asCheck = _jquery2.default.extend({
      setDefaults: asCheck.setDefaults,
      noConflict: function noConflict() {
        _jquery2.default.fn.asCheck = OtherAsCheck;

        return jQueryAsCheck;
      }
    }, info);
  }
);