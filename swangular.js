(function() {
    'use strict';

    // Check we have sweet alert js included
    if (angular.isUndefined(window.swal)) {
        throw "Please make sure Sweet Alert 2 is included! https://github.com/limonte/sweetalert2";
    }

angular.module('swangular', [])
    .factory('swangular', ['$compile', '$http', '$rootScope', '$q', function($compile, $http, $rootScope, $q) {

        /*
         *
         * Sweet Alert functions
         * The four functions below are just convenience methods
         *
         * ex. Swangular.alert("This is a warning message");
         *
         */
        function swal_alert(message, customOptions) {

            var options = angular.extend({
                title: "Alert",
                text: message,
                type: "warning",
                showCancelButton: false
            }, customOptions);

            return swal(options);

        }

        function swal_info(message, customOptions) {

            var options = angular.extend({
                title: "Info",
                text: message,
                type: "info",
                showCancelButton: false
            }, customOptions);

            return swal(options);

        }

        function swal_success(message, customOptions) {

            var options = angular.extend({
                title: "Success",
                text: message,
                type: "success",
                showCancelButton: false
            }, customOptions);

            return swal(options);

        }

        function swal_confirm(message, customOptions) {

            var options = angular.extend({
                title: "Alert",
                text: message,
                type: "warning"
            }, customOptions);

            return swal(options);

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
        function swal_html(options){

            return _getHtml(options).then(function(html){
                if(options.scope) {

                    options.html = $compile(html)(options.scope);

                } else if(options.controller){

                    options.html = $compile(_wrapHtmlInController(options))($rootScope);

                }

                return swal(options);

            });

        }

        function _wrapHtmlInController(options){

            var controllerString = 'ng-controller="' + options.controller;

            if(options.controllerAs){

                controllerString = controllerString.concat(' as ' + options.controllerAs);

            }

            return '<div ' + controllerString + '">' + html + '</div>';

        }

        function _getHtml(options){

            var deferred = $q.defer();

            if(options.templateHtml) {

                _getTemplate(options.templateHtml).then(function(htmlTemplate) {
                    deferred.resolve(htmlTemplate)
                })

            } else {
                deferred.resolve(options.html);
            }

            return deferred.promise;

        }

        function _getTemplate(tmpl) {
            return $http.get(tmpl).then(function(res) {
                console.log(res.data);
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
            if(arg1 !== null && typeof arg1 === 'object') {
                return swal(arg1)
            }

            // In case of: title, text, type
            else {
                return swal(arg1, arg2, arg3);
            }
        }
        

        return {
            alert: swal_alert,
            confirm: swal_confirm,
            info: swal_info,
            success: swal_success,
            html: swal_html,
            swal: swal_base
        }

    }]);


})();