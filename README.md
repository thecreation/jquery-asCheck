#jquery-check

The powerful jQuery plugin that creates a check. <a href="http://amazingsurge.github.io/jquery-check/">Project page and demos</a><br />
Download: <a href="https://github.com/amazingSurge/jquery-check/archive/master.zip">jquery-check-master.zip</a>

***

## Features

* **Lightweight size** — 1 kb gzipped

## Dependencies

* <a href="http://jquery.com/" target="_blank">jQuery 1.83+</a>

## Usage

Import this libraries:
* jQuery
* jquery-check.min.js

And CSS:
* jquery-check.css - desirable if you have not yet connected one


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

<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>namespace</td>
            <td>'check'</td>
            <td>Optional property, set a namspace for css class, for example, we have <code>.check_active</code> class for active effect, if namespace set to 'as-check', then it will be <code>.as-check_active</td>
        </tr>
        <tr>
            <td>skin</td>
            <td>null</td>
            <td>Optional property, set transition effect, it works after you load   specified skin file</td>
        </tr>
        <tr>
            <td>state</td>
            <td>enable</td>
            <td>Optional property, set input's disabled property</td>
        </tr>
        <tr>
            <td>checked</td>
            <td>'checked'</td>
            <td>Optional property, set input's checked property</td>
        </tr>
        <tr>
            <td>type</td>
            <td>'checkbox'</td>
            <td>Optional property, set input's type</td>
        </tr>
        <tr>
            <td>Onchange</td>
            <td>function(){}</td>
            <td>callback after input's checked property is changed </td>
        </tr>
    </tbody>
</table>

## Public methods

jquery check has different methods , we can use it as below :
```javascript
// set element's property
$(".radio").check("set");

// set input's disabled property to false
$(".radio").check("enable");

// set input's disabled property to true
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

## Changes

| Version | Notes                                                            |
|---------|------------------------------------------------------------------|
|   0.1.x | ([compare][compare-1.1]) add history function                    |
|     ... | ...                                                              |

[compare-1.1]: https://github.com/amazingSurge/jquery-check/compare/v1.1.0...v1.2.0

## Author
[amazingSurge](http://amazingSurge.com)

## License
jQuery-check plugin is released under the <a href="https://github.com/amazingSurge/jquery-check/blob/master/LICENCE.GPL" target="_blank">GPL licence</a>.


