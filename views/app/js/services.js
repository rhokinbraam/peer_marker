'use strict';

'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
    value('version', '0.1').factory("AssignmentService",function ($http) {
        return { all: function () {
            return $http.get("api/assignments")
        } };
    }).factory('UserService', function ($http) {
        return { get: function () {
            return $http.get("api/user")
        } };
    });