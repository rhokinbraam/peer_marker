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
        $routeProvider.when('/answers', {templateUrl: 'partials/assignments.html', controller: 'AssignmentsController'});
        $routeProvider.otherwise({redirectTo: '/answers'});
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

            $httpBackend.whenGET('api/answers').respond([
                {
                    assignment: { name: "One", status : "DONE"},
                    date: '1-jan-2012',
                    grade: 85,
                    id: 1
                },
                {
                    assignment: { name: "Two", status : "DONE"},
                    date: '1-feb-2012',
                    grade: 65,
                    id: 2
                },
                {
                    assignment: { name: "Three" , status : "DONE"},
                    date: '1-mar-2012',
                    grade: 75,
                    id: 3
                },
                {
                    assignment: { name: "Four", status : "EDITING"},
                    date: '1-apr-2012',
                    grade: 95,
                    id: 4
                }
            ]);

            $httpBackend.whenGET("api/user").respond({
                name: 'Name'
            });

            $httpBackend.whenGET(/^partials\//).passThrough();
        });
}(angular));