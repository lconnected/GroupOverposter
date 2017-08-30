// props
contextPath = '/';
appId = 6159447;

// app
var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/:groupId', {
            templateUrl: 'templates/message-list.html',
            controller: 'MessageListController'
        })
        .otherwise({
            redirectTo: '/0',
            templateUrl: 'templates/message-list.html',
            controller: 'MessageListController'
        });
});