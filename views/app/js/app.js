'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
        'ngRoute',
        'myApp.filters',
        'myApp.services',
        'myApp.directives',
        'myApp.controllers'
    ]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/student', {templateUrl: 'partials/student.html', controller: 'StudentController'});
        $routeProvider.when('/teacher', {templateUrl: 'partials/teacher.html', controller: 'TeacherController'});
        $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'HomeController'});
        $routeProvider.otherwise({redirectTo: '/home'});
    }]);


(function (ng) {
    if (!document.URL.match(/\?nobackend[\w\W]*/)) {
        return;
    }
    ng.module('myApp')
        .config(function ($provide) {
            $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
        })
        .run(function ($httpBackend) {

            (function () {
                var assigment = {};
                var assignmentResponse = function () {
                    console.debug("Response" + JSON.stringify(assigment));
                    return assigment;
                };
                setTimeout(function () {
                    console.debug("extending assignment")
                    angular.extend(assigment, {name: "New Assigment"});
                }, 10000);
                $httpBackend.whenGET('api/assignment').respond(assignmentResponse());
            })();

            (function(){
                var marking={};
                var markingTemp=[];
                var responses = [
                                 [{answers: 5, evaluations: 0}, {answers: 1, evaluations: 1} ],
                                 [{answers: 4, evaluations: 0}, {answers: 1, evaluations: 1}],
                                 [{answers: 2, evaluations: 0}, {answers: 3, evaluations: 1}, {answers: 2, evaluations: 2}, ],
                                 [{answers: 0, evaluations: 0}, {answers: 1, evaluations: 1}, {answers: 1, evaluations: 2},{answers: 3, evaluations: 3}, ],
                                 ];
                
                var running = setInterval(function(){
                    if (responses.length < 1) {
                        clearInterval(running);
                        return;
                    }
                    
                    markingTemp.push(responses.pop());
                    angular.extend(marking, markingTemp);
                }, 2000);
                
                var markingResponse = function(){
                    return marking;
                };
                
                $httpBackend.whenGET('api/marking').respond(markingResponse());
            })();
            
            $httpBackend.whenGET('api/answers').respond([
                {
                    assignment: { name: "One", status: "DONE"},
                    date: '1-jan-2012',
                    grade: 85,
                    id: 1
                },
                {
                    assignment: { name: "Two", status: "DONE"},
                    date: '1-feb-2012',
                    grade: 65,
                    id: 2
                },
                {
                    assignment: { name: "Three", status: "DONE"},
                    date: '1-mar-2012',
                    grade: 75,
                    id: 3
                },
                {
                    assignment: { name: "Four", status: "EDITING"},
                    date: '1-apr-2012',
                    grade: 95,
                    id: 4
                }
            ]);

            $httpBackend.whenGET("api/user").respond({
                name: 'Name',
                type: 'student'
            });

            $httpBackend.whenGET(/^partials\//).passThrough();
        });
}(angular));