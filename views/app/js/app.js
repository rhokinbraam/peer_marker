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
        $routeProvider.when('/assignments', {templateUrl: 'partials/assignments.html', controller: 'AssignmentsController'});
        $routeProvider.otherwise({redirectTo: '/assignments'});
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

            $httpBackend.whenGET('api/assignments').respond([
                {
                    title: 'Assignment 1',
                    date: '1-jan-2012',
                    grade: 85
                },
                {
                    title: 'Assignment 2',
                    date: '1-feb-2012',
                    grade: 65
                },
                {
                    title: 'Assignment 3',
                    date: '1-mar-2012',
                    grade: 75
                },
                {
                    title: 'Assignment 4',
                    date: '1-apr-2012',
                    grade: 95
                }
            ]);

            $httpBackend.whenGET("api/user").respond({
                name: 'Name'
            });

            $httpBackend.whenGET(/^partials\//).passThrough();
        });
}(angular));