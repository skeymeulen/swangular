(function() {
  'use strict';

  // Check we have sweet alert js included
  if (angular.isUndefined(window.swal)) {
    throw 'Please make sure Sweet Alert 2 is included! https://github.com/limonte/sweetalert2';
  }

  angular.module('swangular', []).provider('swangular', function ProvideSwangular() {
    return {
      setDefaults: setDefaults,
      $get: [
        '$compile',
        '$http',
        '$rootScope',
        '$q',
        '$controller',
        '$injector',
        '$templateCache',
        '$timeout',
        instantiateSwangular
      ]
    };

    function setDefaults(options) {
      swal.setDefaults(options);
    }

    function instantiateSwangular($compile, $http, $rootScope, $q, $controller, $injector, $templateCache, $timeout) {
      /*
       *
       * Sweet Alert functions
       * The four functions below are just convenience methods
       *
       * ex. Swangular.alert("This is a warning message");
       *
       */
      function swal_alert(message, customOptions) {
        var options = angular.extend(
          {
            title: 'Alert',
            text: message,
            type: 'warning',
            showCancelButton: false
          },
          customOptions
        );

        return $q.when(swal(options));
      }

      function swal_info(message, customOptions) {
        var options = angular.extend(
          {
            title: 'Info',
            text: message,
            type: 'info',
            showCancelButton: false
          },
          customOptions
        );

        return $q.when(swal(options));
      }

      function swal_success(message, customOptions) {
        var options = angular.extend(
          {
            title: 'Success',
            text: message,
            type: 'success',
            showCancelButton: false
          },
          customOptions
        );

        return $q.when(swal(options));
      }

      function swal_confirm(message, customOptions) {
        var options = angular.extend(
          {
            title: 'Alert',
            text: message,
            type: 'warning'
          },
          customOptions
        );

        return $q.when(swal(options));
      }

      /*
       *
       * HTML Sweet Alert function
       * Use this for for passing html that will be compiled to Angular
       * You can pass an HTML string directly via 'html' option, or you can pass a link to template via 'templateHtml' option.
       *
       *  ex. Swangular.html({title: "Please fill in!",scope: $scope,templateHtml: '/templates/template.html'})
       *         .then(function() { console.log("Done"); })
       *
       */
      function swal_open(options) {
        var resolve = angular.extend({}, options.resolve);

        angular.forEach(resolve, function(value, key) {
          resolve[key] = angular.isString(value) ? $injector.get(value) : $injector.invoke(value, null, null, key);
        });

        return $q
          .all({
            html: _getHtml(options),
            locals: $q.all(resolve)
          })
          .then(function(setup) {
            var scope = options.scope,
              controller = options.controller,
              controllerAsOption = options.controllerAs,
              preConfirm = options.preConfirm;

            delete options.html;
            delete options.htmlTemplate;
            delete options.resolve;
            delete options.scope;
            delete options.controller;
            delete options.controllerAs;
            delete options.preConfirm;

            var locals = setup.locals;

            options.html = setup.html;

            scope = scope ? scope.$new() : $rootScope.$new();

            if (controller) {
              var controllerAs;

              if (controllerAsOption && angular.isString(controllerAsOption)) {
                controllerAs = controllerAsOption;
              }

              var controllerInstance = $controller(
                controller,
                angular.extend(locals, {
                  $scope: scope
                }),
                false,
                controllerAs
              );

              if (typeof preConfirm === 'string') {
                options.preConfirm = function() {
                  return $timeout(controllerInstance[preConfirm].bind(controllerInstance));
                };
              }
            }

            if (typeof preConfirm === 'function') {
              options.preConfirm = function() {
                return $timeout(preConfirm);
              };
            }

            var prom = $q.when(swal(options));
            var html = document.getElementsByClassName('swal2-modal')[0];

            // If there is a form, trigger the button on press of enter button
            var form = html.getElementsByTagName('form');
            if (form[0]) {
              form[0].onkeyup = function(event) {
                event.stopPropagation();
                if (event.keyCode === 13) {
                  html.querySelector('.swal2-confirm').click();
                }
              };
            }

            $compile(html)(scope);

            return prom;
          });
      }

      function _getHtml(options) {
        if (options.htmlTemplate) {
          return _getTemplate(options.htmlTemplate);
        } else {
          return options.html;
        }
      }

      function _getTemplate(tmpl) {
        return $http.get(tmpl, { cache: $templateCache }).then(function(res) {
          return res.data || '';
        });
      }

      /*
       *
       * Base Sweet Alert function
       * Use this for for a direct mapping to sweetalert,
       * by either passing an options object or by passing up to 3 string arguments
       *
       * ex. 1: Swangular.swal("Good job!", "You clicked the button!", "success")
       *
       * ex. 2: Swangular.swal({title: "Auto close alert!", text: "I will close in 2 seconds.", timer: 2000});
       *
       */
      function swal_base(arg1, arg2, arg3) {
        // In case of options
        if (arg1 !== null && typeof arg1 === 'object') {
          return $q.when(swal(arg1));
        } else {
          // In case of: title, text, type
          return $q.when(swal(arg1, arg2, arg3));
        }
      }

      /*
       * SweetAlert2 Global Methods
       */

      function close() {
        $rootScope.$evalAsync(function() {
          swal.close();
        });
      }

      function disableButtons() {
        $rootScope.$evalAsync(function() {
          swal.disableButtons();
        });
      }

      function enableButtons() {
        $rootScope.$evalAsync(function() {
          swal.enableButtons();
        });
      }

      function disableConfirmButton() {
        $rootScope.$evalAsync(function() {
          swal.disableConfirmButton();
        });
      }

      function enableConfirmButton() {
        $rootScope.$evalAsync(function() {
          swal.enableConfirmButton();
        });
      }

      function clickConfirm() {
        $rootScope.$evalAsync(function() {
          swal.clickConfirm();
        });
      }

      function showLoading() {
        $rootScope.$evalAsync(function() {
          swal.showLoading();
        });
      }

      function clickCancel() {
        $rootScope.$evalAsync(function() {
          swal.clickCancel();
        });
      }

      function hideLoading() {
        $rootScope.$evalAsync(function() {
          swal.hideLoading();
        });
      }

      function setDefaults(options) {
        $rootScope.$evalAsync(function() {
          swal.setDefaults(options);
        });
      }

      return {
        alert: swal_alert,
        confirm: swal_confirm,
        info: swal_info,
        success: swal_success,
        open: swal_open,
        swal: swal_base,
        closeModal: close,
        close: close,
        disableButtons: disableButtons,
        enableButtons: enableButtons,
        disableConfirmButton: disableConfirmButton,
        enableConfirmButton: enableConfirmButton,
        clickConfirm: clickConfirm,
        clickCancel: clickCancel,
        showLoading: showLoading,
        enableLoading: showLoading,
        hideLoading: hideLoading,
        disableLoading: hideLoading,
        setDefaults: setDefaults
      };
    }
  });
})();
