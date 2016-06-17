[![github tag](https://img.shields.io/github/tag/skeymeulen/swangular.svg?style=flat-square)](https://github.com/skeymeulen/swangular/tags)
[![Latest Stable Version](https://img.shields.io/bower/v/ng-sweet-alert.svg?style=flat-square)](http://bower.io/search/?q=ng-sweet-alert)
[![Latest Stable Version](https://img.shields.io/npm/v/ng-sweet-alert.svg?style=flat-square)](https://www.npmjs.com/package/ng-sweet-alert)

# swangular

An AngularJS wrapper for Sweet Alert 2 with some added functionality like binding to scope/controller, using html templates...

## Getting Started

The easiest way to install is via bower:

```sh
bower install swangular
```

or via npm:

```sh
npm install swangular
```

Then you just need to include ``swangular.js`` and add the dependency in your module

```javascript
var app = angular.module('yourAwesomeApp', ['swangular']);

app.controller('MainCtrl', function ($scope, swangular) {
    $scope.clickToOpen = function () {
        swangular.swal('Swangular Demo', 'Great demo, right?', 'question')
    };
});
```

## API

The swangular service exposes a number of methods for you to use. Below you can find a list of all the exposed methods:

===

### ``.swal(options)``

This method maps directly to Sweet Alert 2, and thus has all the same options.

```javascript
swangular.swal({   
  title: 'Are you sure you want to pet this capybara?',
  text: "It looks kinda shady",
  type: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Hell, yeah!' });
```

