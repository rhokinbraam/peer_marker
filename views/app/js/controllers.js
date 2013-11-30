'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
    controller('AssignmentController', ['$scope', 'AssignmentService', function ($scope, AssignmentService) {
        AssignmentService.all().then(function (result) {
            $scope.assignments = result.data;
        });
    }]);