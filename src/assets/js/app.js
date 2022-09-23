/// <reference path="vendor/angular.min.js" />


(function () {
    var app = angular.module("MainModule", []);
    var HeaderController = function ($scope, $http) {
        $scope.message = "this is header";
    }
    app.controller("HeaderController", HeaderController);
}())
