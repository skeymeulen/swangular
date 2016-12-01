[![github tag](https://img.shields.io/github/tag/skeymeulen/swangular.svg?style=flat-square)](https://github.com/skeymeulen/swangular/tags)
[![Latest Stable Version](https://img.shields.io/bower/v/swangular.svg?style=flat-square)](http://bower.io/search/?q=swangular)
[![Latest Stable Version](https://img.shields.io/npm/v/swangular.svg?style=flat-square)](https://www.npmjs.com/package/swangular)
[![Build Status](https://travis-ci.org/skeymeulen/swangular.svg?branch=master)](https://travis-ci.org/skeymeulen/swangular)

swangular
======

An AngularJS wrapper for [SweetAlert2](https://github.com/limonte/sweetalert2) with some added functionality like binding to scope/controller, using html templates...

Getting Started
-------

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

API
-------

The swangular service exposes a number of methods for you to use. Below you can find a list of all the exposed methods:

``.swal(options)``
-------

This method maps directly to SweetAlert2, and thus has all the same options. Nothing new here.

```javascript
swangular.swal({   
  title: 'Are you sure you want to pet this capybara?',
  text: "It looks kinda shady",
  type: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Hell, yeah!' });
```

``.success(message, [customOptions])``
-------

Will create a success message with a default `title` 'Success', and default `type` 'success'. You can overwrite/add to these options with the optional `customOptions` parameter.

```javascript
swangular.success("Great job!");
```

``.confirm(message, [customOptions])``
-------

Will create a confirm message with a default `title` 'Alert', default `type` 'warning' and a cancel button. You can overwrite/add to these options with the optional `customOptions` parameter.

```javascript
swangular.confirm("Are you sure you want to take the red pill?");
```

``.alert(message, [customOptions])``
-------

Will create an alert message with a default `title` 'Alert', and default `type` 'warning'. You can overwrite/add to these options with the optional `customOptions` parameter.

```javascript
swangular.alert("Look out, I'm about to close!", {timer: 2000});
```

``.info(message, [customOptions])``
-------

Will create an info message with a default `title` 'Info', and default `type` 'info'. You can overwrite/add to these options with the optional `customOptions` parameter.

```javascript
swangular.info("My info message", {title: "My custom information title!"});
```

``.open(options)``
-------

Will open a SweetAlert2 alert with some Angular sugar on top. You can still use all SweetAlert2 options, but there are a number of Angular specific options added. This allows for binding to scope/controller, using html-templates and more.

```javascript
swangular.open({
        title: "New user",
        htmlTemplate: "/components/new-user/new_user.html",
        showCancelButton: true,
        preConfirm: "submit",
        showLoaderOnConfirm: true,
        controller: 'NewUserCtrl',
        controllerAs: 'vm',
        resolve: {
            injectedValue: function() {
                return "What a time to be alive!";
            }
        }
});
    
app.controller('NewUserCtrl', function (injectedValue) {
        console.log(injectedValue) // What a time to be alive!
});
```

#### Options:

All the options below are unique to Swangular or have added functionality compared to SweetAlert2. Besides these options, you can still use all standard SweetAlert2 options.

| Argument         | Type    | Description
| ---------------- | ------- | ------------- 
| html             | `string`| This can be use in the same way as SweetAlert2 `html`. Additionally, if a `scope` or `controller` options are passed, this html will be compiled and the markup will be bound to that particular scope/controller.
| htmlTemplate     | `string`| Has the same function as `html`, but here you can pass a path to an external template.
| scope            | `Object`| Any passed html will be compiled and bound to this scope. If both scope and controller are passed, this scope will be used as the parent scope for the controller.
| controller       | `string`| Any passed html will be compiled and bound to this controller.
| controllerAs     | `string`| If you use controllerAs syntax in your markup, you can pass the correct string here.
| preConfirm       | `string` or `function()`| When a function, it will behave just like in SweetAlert2. When a string is passed, it will use this string to look for a function on the passed `controller`. You have to make sure there is a function with the specified name on that controller. Should return a promise.
| resolve       | `Object.<String, Function>`| Dependencies to be injected into the controller. If one or more of the depencies are promises, swangular will wait untill these are resolved/rejected before instantiating the controller.

Methods
-------

The following methods are also accessible:
* ``swangular.close()``
* ``swangular.closeModal()``
* ``swangular.enableButtons()``
* ``swangular.disableButtons()``
* ``swangular.enableConfirmButton()``
* ``swangular.disableConfirmButton()``
* ``swangular.showLoading()``
* ``swangular.enableLoading()``
* ``swangular.hideLoading()``
* ``swangular.disableLoading()``
* ``swangular.clickConfirm()``
* ``swangular.clickCancel()``

Provider
-------

During config phase you can inject the `swangularProvider` to set default configuration options.
```javascript    
app.config(function (swangularProvider) {
    swangularProvider.setDefaults({
        animation: false,
        reverseButtons: true
    });
});
```