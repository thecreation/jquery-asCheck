/*
 * jquery-check
 * https://github.com/amazingSurge/jquery-check
 *
 * Copyright (c) 2013 joeylin
 * Licensed under the MIT license.
 */

(function($) {

    var Check = $.check = function(input, options) {

        this.$input = $(input);

        // options
        var meta_data = {
            type: this.$input.attr('type'),
            group: this.$input.attr('name')
        };

        this.options = $.extend({}, Check.defaults, options, meta_data);
        this.namespace = this.options.namespace;

        this.checked = this.$input.prop('checked') ? 'checked' : 'unchecked';
        this.state = this.$input.prop('disabled') ? 'disabled' : 'enabled';
        this.classname = {
            checked: this.namespace + '-checked',
            disabled: this.namespace + '-disabled'
        };

        // enable flag
        this.enable = this.$input.prop('disabled') ? false : true ;
        this.intial = false;

        if (this.options.type === 'radio') {
            this.$group = this.options.group === undefined ?  this : $('input[name="' + this.options.group + '"]' );
            //console.log(this.$group)
        }

        var _id = this.$input.attr('id');

        if (_id) {
            this.$label = $('label[for="'+ _id +'"]');
        } else {
            this.$label = null;
        }

        this.$input.addClass(this.namespace).addClass(this.namespace + '-' + this.options.skin);

        this.init();
    };

    Check.prototype = {
        constructor: Check,
        init: function() {
            var self = this,
                tpl = '<span class="' + this.namespace + '-box"></span>';

            this.$check = $(tpl);
            this.$input.css({display: 'none'}).after(this.$check);

            this.$check.add(this.$label).on('click',function() {
                
                if (self.enable === false) {
                    return false;
                }
                console.log(self.options.type);
                $.proxy(self.trigger,self)(self.options.type);
                return false;
            });

            this.set(this.checked);
            this.set(this.state);

            this.intial = true;
        },

        trigger: function(type) {
            if (type === 'radio') {
                this.$group.each(function(i,v) {

                    if ($(v).prop('checked') === true) {
                        $(v).data('check').set('unchecked');
                        console.log('trigger')
                    }
                });
                this.set('checked');
            } else {
                if (this.checked === 'checked') {
                    this.set('unchecked');
                } else {
                    this.set('checked');
                }
            }
        },

        set: function(value) {
            var self = this;

            if (this.intial === true) {

                if (this.value === value) {
                    return
                }

                if (this.state === value) {
                    return
                }
            }

            switch(value) {
                case 'checked':
                    this.checked = value;
                    this.$check.addClass(this.classname.checked);
                    this.$input.prop('checked',true);
                    this.$input.trigger('checked');
                    break;
                case 'unchecked':
                    this.checked = value;
                    this.$check.removeClass(this.classname.checked);
                    this.$input.prop('checked',false);
                    this.$input.trigger('unchecked');
                    break;
                case 'disabled': 
                    this.state = value;
                    this.enabled = false;
                    this.$check.addClass(this.classname.disabled);
                    this.$input.prop('disabled',true);
                    this.$input.trigger('disabled');
                    break;
                case 'enabled':
                    this.state = value;
                    this.enabled = true;
                    this.$check.removeClass(this.classname.disabled);
                    this.$input.prop('disabled',false); 
                    this.$input.trigger('enabled');  
                    break;
            }                 
        },

        enable: function() {
            this.set('enabled');
        },
        disable: function() {
            this.set('disabled');
        },
        checked: function() {
            this.set('checked');
        },
        unchecked: function() {
            this.set('unchecked');
        }
    };

    Check.defaults = {
        namespace: 'check',

        skin: 'simple',

        state: 'enabled', // null string means enable the check, 'disable' means disable the check
        checked: 'checked',  // null string means unchecked, 'checked' means checked
        type: 'checkbox' // checkbox , radio
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
            console.log('start')
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
