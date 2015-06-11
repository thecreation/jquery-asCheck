#jquery-asCheck

The powerful jQuery plugin that provide a easy used and customized checkbox. <a href="http://amazingSurge.github.io/jquery-asCheck/">Project page and demos</a><br />
Download: <a href="https://github.com/amazingSurge/jquery-asCheck/archive/master.zip">jquery-asCheck-master.zip</a>

***

## Features

* **callbacks to handle changes** 
* **Lightweight size** — 1 kb gzipped
* **Saves changes to textarea, works carefully with any selectors** 

## Dependencies

* <a href="http://jquery.com/" target="_blank">jQuery 1.83+</a>

## Usage

Import this libraries:
* jQuery
* jquery-asCheck.min.js

And CSS:
* jquery-asCheck.css - desirable if you have not yet connected one


Create base html element:
```html
<ul>
    <li>
        <input class="radio" type="radio" name="radiobox" id="male-1" value="male" />
        <label for="male-1" >Male</label>
    </li>
     <li>
        <input class="radio" type="radio" name="radiobox" id="male-2" value="female" />
        <label for="male-2" >Female</label>
    </li>
    <li>
        <input class="radio" type="radio" name="radiobox" id="male-3" value="male" disabled="disabled" />
        <label for="male-3" >checked disable</label>
    </li>
    <li>
        <input class="radio" type="radio" name="radiobox" id="male-4" value="male" disabled="disabled" />
        <label for="male-4" >checked disable</label>
    </li>
</ul>
```

Initialize check:
```javascript
$('.radio').check({skin: 'skin-1'});
```

Or initialize check with custom settings:
```javascript
$(".radio").check({
         namespace: 'check',
        skin: null,
        state: 'enabled', 
        checked: 'checked', 
        type: 'checkbox',  // checkbox , radio
        onChange: function() {}
});
```

## Settings

```javascript
{
    //Optional property, set a namspace for css class, for example, we 
    //have <code>.check_active</code> class for active effect, if
    //namespace set to 'as-check', then it will be <code>.as-check_active
    namespace: 'check',

    //Optional property, set transition effect, it works after you load specified skin file
    skin: null,

    //Optional property, set input's disabled state
    state: enable,

    //Optional property, set input's checked property,if the value is 'checked',this input will be checked
    checked: 'checked',

    //Optional property, set input's type
    type: 'checkbox',

    //callback after input's state is changed
    Onchange: function(）{}
}
```

## Public methods

jquery check has different methods , we can use it as below :
```javascript
// set input's state
$(".radio").check("set");

// remove disabled state
$(".radio").check("enable");

// change input's state to disabled
$(".radio").check("disable");
```

## Event / Callback

* <code>change</code>: trigger when input's checked property changed
* <code>disabled</code>: trigger when input set to disabled
* <code>enabled</code>:  trigger when input set to enabled

how to use event:
```javascript
$(document).on('change', function(event,instance) {
    // instance means current  check instance 
    // some stuff
});
``` 

## Browser support
jquery-tabs is verified to work in Internet Explorer 7+, Firefox 2+, Opera 9+, Google Chrome and Safari browsers. Should also work in many others.

Mobile browsers (like Opera mini, Chrome mobile, Safari mobile, Android browser and others) is coming soon.

## Author
[amazingSurge](http://amazingSurge.com)

## License
jQuery-asCheck plugin is released under the <a href="https://github.com/amazingSurge/jquery-asCheck/blob/master/LICENCE.GPL" target="_blank">GPL licence</a>.


