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
        $routeProvider.when('/assignments', {templateUrl: 'partials/assignments.html', controller: 'AssignmentController'});
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
            $httpBackend.whenGET('/assignments').respond([
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

            $httpBackend.whenGET("/user").respond({
                name: 'Name'
            });

            $httpBackend.whenGET(/^partials\//).passThrough();
        });
}(angular));