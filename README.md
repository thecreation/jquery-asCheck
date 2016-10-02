# [jQuery asCheck](https://github.com/amazingSurge/jquery-asCheck) ![bower][bower-image] [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url] [![prs-welcome]](#contributing)

> A jquery plugin that do amazing things.

## Table of contents
- [Main files](#main-files)
- [Quick start](#quick-start)
- [Requirements](#requirements)
- [Usage](#usage)
- [Examples](#examples)
- [Options](#options)
- [Methods](#methods)
- [Events](#events)
- [No conflict](#no-conflict)
- [Browser support](#browser-support)
- [Contributing](#contributing)
- [Development](#development)
- [Changelog](#changelog)
- [Copyright and license](#copyright-and-license)

## Main files
```
dist/
├── jquery-asCheck.js
├── jquery-asCheck.es.js
├── jquery-asCheck.min.js
└── css/
    ├── asCheck.css
    └── asCheck.min.css
```

## Quick start
Several quick start options are available:
#### Download the latest build

 * [Development](https://raw.githubusercontent.com/amazingSurge/jquery-asCheck/master/dist/jquery-asCheck.js) - unminified
 * [Production](https://raw.githubusercontent.com/amazingSurge/jquery-asCheck/master/dist/jquery-asCheck.min.js) - minified

#### Install From Bower
```sh
bower install jquery-asCheck --save
```

#### Install From Npm
```sh
npm install jquery-asCheck --save
```

#### Build From Source
If you want build from source:

```sh
git clone git@github.com:amazingSurge/jquery-asCheck.git
cd jquery-asCheck
npm install
npm install -g gulp-cli babel-cli
gulp build
```

Done!

## Requirements
`jquery-asCheck` requires the latest version of [`jQuery`](https://jquery.com/download/).

## Usage
#### Including files:

```html
<link rel="stylesheet" href="/path/to/asCheck.css">
<script src="/path/to/jquery.js"></script>
<script src="/path/to/jquery-asCheck.js"></script>
```

#### Required HTML structure

```html
<input class="example" type="radio" name="radio" id="radio-example" value="male" /><label for="radio-example">Example</label>
```

#### Initialization
All you need to do is call the plugin on the element:

```javascript
jQuery(function($) {
  $('.example').asCheck(); 
});
```

## Examples
There are some example usages that you can look at to get started. They can be found in the
[examples folder](https://github.com/amazingSurge/jquery-asCheck/tree/master/examples).

## Options
`jquery-asCheck` can accept an options object to alter the way it behaves. You can see the default options by call `$.asCheck.setDefaults()`. The structure of an options object is as follows:

```
{
  namespace: 'asCheck',
  skin: null,

  disabled: false
}
```

## Methods
Methods are called on asCheck instances through the asCheck method itself.
You can also save the instances to variable for further use.

```javascript
// call directly
$().asCheck('destory');

// or
var api = $().data('asCheck');
api.destory();
```

#### enable()
Enable the check functions.
```javascript
$().asCheck('enable');
```

#### disable()
Disable the check functions.
```javascript
$().asCheck('disable');
```

#### destroy()
Destroy the check instance.
```javascript
$().asCheck('destroy');
```

## Events
`jquery-asCheck` provides custom events for the plugin’s unique actions. 

```javascript
$('.the-element').on('asCheck::ready', function (e) {
  // on instance ready
});

```

Event   | Description
------- | -----------
init    | Fires when the instance is setup for the first time.
ready   | Fires when the instance is ready for API use.
enable  | Fired when the `enable` instance method has been called.
disable | Fired when the `disable` instance method has been called.
destroy | Fires when an instance is destroyed. 

## No conflict
If you have to use other plugin with the same namespace, just call the `$.asCheck.noConflict` method to revert to it.

```html
<script src="other-plugin.js"></script>
<script src="jquery-asCheck.js"></script>
<script>
  $.asCheck.noConflict();
  // Code that uses other plugin's "$().asCheck" can follow here.
</script>
```

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/internet-explorer/internet-explorer_32x32.png" alt="IE"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | 9-11 ✓ | Latest ✓ |

As a jQuery plugin, you also need to see the [jQuery Browser Support](http://jquery.com/browser-support/).

## Contributing
Anyone and everyone is welcome to contribute. Please take a moment to
review the [guidelines for contributing](CONTRIBUTING.md). Make sure you're using the latest version of `jquery-asCheck` before submitting an issue. There are several ways to help out:

* [Bug reports](CONTRIBUTING.md#bug-reports)
* [Feature requests](CONTRIBUTING.md#feature-requests)
* [Pull requests](CONTRIBUTING.md#pull-requests)
* Write test cases for open bug issues
* Contribute to the documentation

## Development
`jquery-asCheck` is built modularly and uses Gulp as a build system to build its distributable files. To install the necessary dependencies for the build system, please run:

```sh
npm install -g gulp
npm install -g babel-cli
npm install
```

Then you can generate new distributable files from the sources, using:
```
gulp build
```

More gulp tasks can be found [here](CONTRIBUTING.md#available-tasks).

## Changelog
To see the list of recent changes, see [Releases section](https://github.com/amazingSurge/jquery-asCheck/releases).

## Copyright and license
Copyright (C) 2016 amazingSurge.

Licensed under [the LGPL license](LICENSE).

[⬆ back to top](#table-of-contents)

[bower-image]: https://img.shields.io/bower/v/jquery-asCheck.svg?style=flat
[bower-link]: https://david-dm.org/amazingSurge/jquery-asCheck/dev-status.svg
[npm-image]: https://badge.fury.io/js/jquery-asCheck.svg?style=flat
[npm-url]: https://npmjs.org/package/jquery-asCheck
[license]: https://img.shields.io/npm/l/jquery-asCheck.svg?style=flat
[prs-welcome]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
[daviddm-image]: https://david-dm.org/amazingSurge/jquery-asCheck.svg?style=flat
[daviddm-url]: https://david-dm.org/amazingSurge/jquery-asCheck






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
