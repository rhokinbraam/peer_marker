'use strict';

/* Controllers */

var module = angular.module('myApp.controllers', []).
    controller('AssignmentsController', [
        '$scope',
        'AssignmentService',
        '$timeout', function ($scope, AssignmentService, $timeout) {
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
        }])
    .controller('UserController', ['$scope', 'UserService', function ($scope, UserService) {
        UserService.get().then(function (result) {
		console.debug(JSON.stringify(result.data));            
		$scope.user = result.data;
		console.debug($scope.user.name);            
        });
    }]);
