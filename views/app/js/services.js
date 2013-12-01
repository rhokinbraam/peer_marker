'use strict';

'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
    value('version', '0.1').factory("AssignmentService",function ($http) {
        return { answers: function () {
            return $http.get("api/answers");
        }, fetch: function () {
            return $http.get("api/assignment");
        }, create: function (name, question) {
            return $http.post("api/assignment", {name : name, question: question, status : 'EDITING'});
        }, createAnswer: function (id, answer) {
            return $http.post("api/answer", {assignment : id, answer: answer});
        }, mark: function (assignment) {
            return $http.post("api/assignment", assignment);
        }, marking: function () {
            return $http.get("api/marking");
        } };
    }).factory('UserService', function ($http) {
        return { get: function () {
            return $http.get("api/user");
        } };
    });