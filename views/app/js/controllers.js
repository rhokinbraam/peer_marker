'use strict';

/* Controllers */

var module = angular.module('myApp.controllers', []).
    controller('StudentController', [
        '$scope',
        'AssignmentService',
        'UserService',
        '$timeout', function ($scope, AssignmentService, UserService, $timeout) {

            UserService.get().then(function (result) {
                $scope.user = result.data;
            });

            AssignmentService.answers().then(function (result) {
                $scope.answers = result.data;
            });

            var fetch = function () {
                var checkAssignment = $timeout(function () {
                    AssignmentService.fetch().then(function (result) {
                        var data = result.data;
                        if (data.name) {
                            $scope.assignment = result.data;
                            $timeout.cancel(checkAssignment);
                        }
                        else {
                            fetch();
                        }
                    })
                }, 2000);
            };

            fetch();

            $scope.submit = function (id, answer) {
                AssignmentService.createAnswer(id, answer).then(function () {
                    $scope.assignment = {};
                });
            };

        }])
    .controller('HomeController', [
        '$location',
        'UserService',
        function ($location, UserService) {
            UserService.get().then(function (result) {
                $location.path(result.data.type)
            });
        }])
    .controller('TeacherController', [
        '$scope',
        'UserService',
        'AssignmentService' ,
        '$location' ,
        function ($scope, UserService, AssignmentService, $location) {
            UserService.get().then(function (result) {
                $scope.user = result.data;
            });

            $scope.create = function (name, question) {
                AssignmentService.create(name, question).then(function (result) {
                    $scope.assignment = result.data;
                });
            };

            $scope.mark = function () {
                $scope.assignment.status = 'MARKING';
                AssignmentService.mark($scope.assignment).then(function () {
                    $scope.assignment = null;
                    $location.path('/marking');
                });
            };

        }]).controller('MarkingController', [
        '$scope',
        'UserService',
        'AssignmentService' ,
        '$timeout' ,
        function ($scope, UserService, AssignmentService, $timeout) {
            UserService.get().then(function (result) {
                $scope.user = result.data;
            });

            AssignmentService.fetch().then(function (result) {
                $scope.assignment = result.data;
            });

            var observeMarking = function () {
                var checkMarking = $timeout(function () {
                    AssignmentService.marking().then(function (result) {
                        var data = result.data;
                        console.debug(result.data);
                        $scope.markingData = data;
                        observeMarking();
                    })
                }, 1000);
            };

            observeMarking();
        }]);
