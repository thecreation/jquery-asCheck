/*
 * jquery-asCheck
 * https://github.com/amazingSurge/jquery-asCheck
 *
 * Copyright (c) 2014 amazingSurge
 * Licensed under the MIT license.
 */

(function($) {
    var AsCheck = $.asCheck = function(input, options) {
        this.$input = $(input);
        // options
        var meta_data = {
            group: this.$input.attr('name')
        };
        if (meta_data.group) {
            this.name = meta_data.group;
        } else {
            this.name = options.name;
        }

        this.options = $.extend({}, AsCheck.defaults, options, meta_data);
        this.namespace = this.options.namespace;
        this.type = this.$input.attr('type');

        this.checked = this.$input.prop('checked');
        this.disabled = this.$input.prop('disabled') || this.options.disabled;
        this.classname = {
            checked: this.namespace + '_checked',
            disabled: this.namespace + '_disabled',
            hover: this.namespace + '_hover'
        };

        // enable flag
        this.initialized = false;

        if (this.type === 'radio') {
            this.$group = this.options.group === undefined ? this.$input : $('input[name="' + this.options.group + '"]');
        }

        var _id = this.$input.attr('id');

        if (_id) {
            this.$label = $('label[for="' + _id + '"]');
        } else {
            this.$label = null;
        }

        this._trigger('init');
        this.init();
    };

    AsCheck.prototype = {
        constructor: AsCheck,
        init: function() {
            var self = this,
                tpl = '<span class="' + this.namespace + '"></span>';

            this.$check = $(tpl);
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

            this.$input.trigger('asCheck::init', this);

            this.$check.add(this.$label).on('click.check', function() {
                if (self.disabled === true) {
                    return false;
                }
                self.trigger.call(self, self.type);
                return false;
            });

            this.$check.add(this.$label).on('mouseenter.check', function() {
                if (self.disabled === true) {
                    return false;
                }
                self.$check.add(self.$label).addClass(self.classname.hover);
                return false;
            }).on('mouseleave.check', function() {
                if (self.disabled === true) {
                    return false;
                }
                self.$check.add(self.$label).removeClass(self.classname.hover);
                return false;
            });

            this.set('checked', this.checked);
            this.set('disabled', this.disabled);

            this.initialized = true;
            this._trigger('ready');
        },
        _trigger: function(eventType) {
            var method_arguments = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : undefined,
                data;
            if (method_arguments) {
                data = method_arguments;
                data.push(this);
            } else {
                data = this;
            }
            // event
            this.$input.trigger('asCheck::' + eventType, data);
            this.$input.trigger(eventType + '.asCheck', data);

            // callback
            eventType = eventType.replace(/\b\w+\b/g, function(word) {
                return word.substring(0, 1).toUpperCase() + word.substring(1);
            });
            var onFunction = 'on' + eventType;
            if (typeof this.options[onFunction] === 'function') {
                this.options[onFunction].apply(this, method_arguments);
            }
        },
        trigger: function(type) {
            if (type === 'radio') {
                if (this.checked === true) {
                    return false;
                }

                this.$group.each(function(i, v) {
                    if ($(v).prop('checked') === true) {
                        $(v).data('asCheck').set('checked', false);
                    }
                });
                this.set('checked', true);
            } else {
                if (this.checked === true) {
                    this.set('checked', false);
                } else {
                    this.set('checked', true);
                }
            }
        },
        set: function(state, value) {
            if (this.initialized === true) {
                if (state === 'checked') {
                    if (this.checked === value) {
                        return;
                    }
                } else {
                    if (this.disabled === value) {
                        return;
                    }
                }
            }
            switch (state) {
                case 'checked':
                    if (value) {
                        this.checked = value;
                        this.$check.addClass(this.classname.checked);
                        this.$input.prop('checked', true);
                        this._trigger('change', this.checked, this.options.name, 'asCheck');
                    }
                    if (!value) {
                        this.checked = value;
                        this.$check.removeClass(this.classname.checked);
                        this.$input.prop('checked', false);
                        if (this.type === 'checkbox') {
                            this._trigger('change', this.checked, this.options.name, 'asCheck');
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
            }
        },

        get: function() {
            return this.$input.prop('checked');
        },

        /*
            Public Method
         */
        check: function() {
            this.set('checked', true);
            return this;
        },
        uncheck: function() {
            this.set('checked', false);
            return this;
        },
        enable: function() {
            this.set('disabled', true);
            return this;
        },
        disable: function() {
            this.set('disabled', false);
            return this;
        },
        destory: function() {
            this.$check.remove();
        }
    };

    AsCheck.defaults = {
        namespace: 'asCheck',
        skin: null,

        disabled: false,
        checked: true,
        name: null,
        onChange: function() {}
    };

    $.fn.asCheck = function(options) {
        if (typeof options === 'string') {
            var method = options;
            var method_arguments = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : [];

            if (/^\_/.test(method)) {
                return false;
            } else if (method === 'get' || (method === 'val' && method_arguments === [])) {
                var api = this.first().data('asCheck');
                if (api && typeof api[method] === 'function') {
                    return api[method].apply(api, method_arguments);
                }
            } else {
                return this.each(function() {
                    var api = $.data(this, 'asCheck');
                    if (api && typeof api[method] === 'function') {
                        api[method].apply(api, method_arguments);
                    }
                });
            }
        } else {
            var opts = options || {};
            opts.$group = this;
            return this.each(function() {
                if (!$.data(this, 'asCheck')) {
                    $.data(this, 'asCheck', new AsCheck(this, opts));
                }
            });
        }
    };
}(jQuery));
