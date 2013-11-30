'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
    controller('AssignmentController', ['$scope', 'AssignmentService', function ($scope, AssignmentService) {
        AssignmentService.all().then(function (result) {
            $scope.assignments = result.data;
        });
    }]).controller('UserController', ['$scope', 'UserService', function ($scope, UserService) {
        UserService.get().then(function (result) {
            $scope.user = result.data;
        });
    }]);