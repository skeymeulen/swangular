var app = angular.module('swangularApp', ['swangular']);

app.controller('AppCtrl', ['$scope', 'swangular', function ($scope, swangular) {

    var vm = this;

    vm.test = "This string was injected from controller";

    vm.openModal1 = function () {
        swangular.swal("Title", "Content");
    };

    vm.openModal2 = function () {
        swangular.open({
            title: "Template test",
            htmlTemplate: "template1.html"
        })
    };

    vm.openModal3 = function () {
        swangular.open({
            title: "Template test",
            htmlTemplate: "template2.html",
            controller: 'ModalCtrl',
            controllerAs: 'vm'
        })
    };

    vm.openModal4 = function () {

        $scope.content = 'This string was injected from scope';

        swangular.open({
            title: "Template test",
            htmlTemplate: "template3.html",
            scope: $scope
        })
    };

    vm.openModal5 = function () {

        swangular.open({
            title: "Template test",
            htmlTemplate: "template2.html",
            controller: 'ResolveCtrl',
            controllerAs: 'vm',
            resolve: {
                resolve: function() {
                    return { content: 'This is resolved content'}
                }
            }
        })
    };

}]);

app.controller('ModalCtrl', function () {

    var vm = this;

    vm.content = "This string was injected from modalcontroller";
    
});

app.controller('ResolveCtrl', [ 'resolve', function (resolve) {

    var vm = this;

    vm.content = resolve.content;

}]);