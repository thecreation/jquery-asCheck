/*! jQuery Check - v0.1.0 - 2013-08-28
* https://github.com/amazingSurge/jquery-check
* Copyright (c) 2013 amazingSurge; Licensed GPL */
(function($) {

    var Check = $.check = function(input, options) {

        this.$input = $(input);

        // options
        var meta_data = {
            group: this.$input.attr('name')
        };

        this.options = $.extend({}, Check.defaults, options, meta_data);
        this.namespace = this.options.namespace;
        this.type = this.$input.attr('type');

        this.checked = this.$input.prop('checked');
        this.disabled = this.$input.prop('disabled') || this.options.disabled;
        this.classname = {
            checked: this.namespace + '_checked',
            disabled: this.namespace + '_disabled'
        };

        // enable flag
        this.initial = false;

        if (this.type === 'radio') {
            this.$group = this.options.group === undefined ? this : $('input[name="' + this.options.group + '"]');
        }

        var _id = this.$input.attr('id');

        if (_id) {
            this.$label = $('label[for="' + _id + '"]');
        } else {
            this.$label = null;
        }

        this.init();
        this.$input.trigger('check::ready', this);
    };

    Check.prototype = {
        constructor: Check,
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

            this.$input.trigger('check::init', this);
            
            this.$check.add(this.$label).on('click.check', function() {
                if (self.disabled === true) {
                    return false;
                }

                self.trigger.call(self, self.type);
                return false;
            });

            this.set('checked', this.checked);
            this.set('disabled', this.disabled);

            this.initial = true;
        },
        trigger: function(type) {
            if (type === 'radio') {
                if (this.checked === true) {
                    return false;
                }

                this.$group.each(function(i, v) {
                    if ($(v).prop('checked') === true) {
                        $(v).data('check').set('checked', false);
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
            if (this.initial === true) {
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
                    if (value === true) {
                        this.checked = value;
                        this.$check.addClass(this.classname.checked);
                        this.$input.prop('checked', true);
                        this.$input.trigger('check::change', this);
                        if (typeof this.options.onChange === 'function') {
                            this.options.onChange(this);
                        }
                    } 
                    if (value === false) {
                        this.checked = value;
                        this.$check.removeClass(this.classname.checked);
                        this.$input.prop('checked', false);
                        if (this.type === 'checkbox' && typeof this.options.onChange === 'function') {
                            this.$input.trigger('check::change', this);
                            this.options.onChange(this);
                        }
                    }
                    break;
                case 'disabled':
                    if (value === true) {
                        this.disabled = value;
                        this.enabled = false;
                        this.$check.addClass(this.classname.disabled);
                        this.$input.prop('disabled', true);
                    } 
                    if (value === false) {
                        this.disabled = value;
                        this.enabled = true;
                        this.$check.removeClass(this.classname.disabled);
                        this.$input.prop('disabled', false);
                    }
                    break;
            }
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

    Check.defaults = {
        namespace: 'check',
        skin: null,

        disabled: false, 
        checked: true, 
        onChange: function() {}
    };

    $.fn.check = function(options) {
        if (typeof options === 'string') {
            var method = options;
            var method_arguments = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : undefined;

            return this.each(function() {
                var api = $.data(this, 'check');
                if (typeof api[method] === 'function') {
                    api[method].apply(api, method_arguments);
                }
            });
        } else {
            var opts = options || {};
            opts.$group = this;
            return this.each(function() {
                if (!$.data(this, 'check')) {
                    $.data(this, 'check', new Check(this, opts));
                }
            });
        }
    };

}(jQuery));
