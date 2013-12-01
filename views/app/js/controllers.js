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
               AssignmentService.createAnswer(id, answer).then(function(){
                  $scope.assignment = {};
               });      
            };

        }]).controller('HomeController', [
        '$location',
        'UserService',
        function ($location, UserService) {
            UserService.get().then(function (result) {
                $location.path(result.data.type)
            });
        }]).controller('TeacherController', ['$scope', 'UserService', 'AssignmentService' , function ($scope, UserService, AssignmentService) {
        UserService.get().then(function (result) {
            $scope.user = result.data;
        });
        $scope.create = function (name, question) {
            AssignmentService.create(name, question).then(function(result){
               console.debug(result.data);
            });
        }
    }]);
