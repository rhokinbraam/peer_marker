'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
    controller('MyCtrl1', ['$scope', 'TodoService', function ($scope, TodoService) {
        TodoService.all().then(function (result) {
            $scope.todos = result.data;
        });
    }])
    .controller('MyCtrl2', [function () {

    }]);