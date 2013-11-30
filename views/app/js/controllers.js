'use strict';

/* Controllers */

var module = angular.module('myApp.controllers', []).
    controller('AssignmentsController', [
        '$scope',
        'AssignmentService',
        'UserService',
        '$timeout', function ($scope, AssignmentService, UserService, $timeout) {
            $scope.name = "test";

            UserService.get().then(function (result) {
                $scope.user = result.data;
            });

            AssignmentService.answers().then(function (result) {
                $scope.answers = result.data;
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
        }]);
