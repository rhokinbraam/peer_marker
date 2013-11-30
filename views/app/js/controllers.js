'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
    controller('MyCtrl1', ['$scope', function ($scope) {
        $scope.todos = ["one", "two"]
    }])
    .controller('MyCtrl2', [function () {

    }]);