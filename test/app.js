var app = angular.module('swangularApp', ['swangular']);

app.controller('AppCtrl', ['$scope', '$q', 'swangular', function ($scope, $q, swangular) {

    var vm = this;

    vm.test = "This string was injected from controller";
    vm.preConfirmContent = "Default";

    vm.preConfirm = function () {
        return new $q(function(resolve, reject) {
            vm.preConfirmContent = "This string was injected by preConfirm";
            resolve();
        })
    };

    vm.openModal1 = function () {
        swangular.swal("Title", "Content").catch(angular.noop);
    };

    vm.openModal2 = function () {
        swangular.open({
            title: "Template test",
            htmlTemplate: "template1.html"
        }).catch(angular.noop);
    };

    vm.openModal3 = function () {
        swangular.open({
            title: "Template test",
            htmlTemplate: "template2.html",
            controller: 'ModalCtrl',
            controllerAs: 'vm'
        }).catch(angular.noop);
    };

    vm.openModal4 = function () {
        $scope.content = 'This string was injected from scope';

        swangular.open({
            title: "Template test",
            htmlTemplate: "template3.html",
            scope: $scope
        }).catch(angular.noop);
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
        }).catch(angular.noop);
    };

    vm.openModal6 = function () {
        swangular.open({
            title: "Pre-confirm test",
            htmlTemplate: "template2.html",
            controller: 'ModalCtrl',
            controllerAs: 'vm',
            preConfirm: vm.preConfirm
        }).catch(angular.noop);
    };

    vm.openModal7 = function () {
        swangular.open({
            title: "Pre-confirm test",
            htmlTemplate: "template2.html",
            controller: 'ModalCtrl',
            controllerAs: 'vm',
            preConfirm: "preConfirm"
        }).catch(angular.noop);
    };

    vm.openModal8 = function () {
        $scope.content = 'This string was injected from scope';

        swangular.open({
            title: "Pre-confirm no controller",
            preConfirm: vm.preConfirm,
            htmlTemplate: '/components/network-container/newServerNetworks/new_server_networks.html',
            scope: $scope
        }).catch(angular.noop);
    };

}]);

app.controller('ModalCtrl', ['$q', function ($q) {

    var vm = this;

    vm.content = "This string was injected from modalcontroller";
    vm.modalPreConfirmContent = "";

    vm.preConfirm = function () {
        return new $q(function(resolve, reject) {
            vm.modalPreConfirmContent = "This string was injected by preConfirm";
            resolve();
        });
    };
    
}]);

app.controller('ResolveCtrl', [ 'resolve', function (resolve) {

    var vm = this;

    vm.content = resolve.content;

}]);

app.controller('ParentCtrl', ['$scope', 'swangular', function ($scope, swangular) {

    var vm = this;

    vm.content = "This string was injected from parent controller";

    vm.openModal9 = function () {
        swangular.open({
            title: "ParentCtrl Modal",
            htmlTemplate: 'template4.html',
            controller: 'ModalCtrl',
            controllerAs: 'child',
            scope: $scope
        }).catch(angular.noop);
    };

}]);
