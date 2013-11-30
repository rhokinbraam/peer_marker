'use strict';

/* Controllers */

var module = angular.module('myApp.controllers', []).
    controller('AssignmentsController', [
        '$scope',
        'AssignmentService',
        '$timeout', function ($scope, AssignmentService, $timeout) {
            AssignmentService.all().then(function (result) {
                $scope.assignments = result.data;
                var fetch = function () {
                    var checkAssignment = $timeout(function () {
                        AssignmentService.fetch().then(function (result) {
                            var data = result.data;
                            console.debug("Data" + JSON.stringify(result.data));
                            if (data.name) {
                                $scope.assignment = result.data;
                                console.debug("End" + JSON.stringify($scope.assignment));
                                $timeout.cancel(checkAssignment);
                            }
                            else {
                                fetch();
                            }
                        })
                    }, 2000);
                };
                fetch();
            });
        }])
    .controller('UserController', ['$scope', 'UserService', function ($scope, UserService) {
        UserService.get().then(function (result) {
            $scope.user = result.data;
        });
    }]);