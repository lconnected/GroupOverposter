/**
 * Created by lconnected.
 */
// properties
/**
 * Context path of the web application
 * @type {string}
 */
const CONTEXT_PATH = '/';
/**
 * Application ID registered in vk.com
 * @type {number}
 */
const APP_ID = 6159447;

/**
 * Variable stores angular module
 */
var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/:groupId', {
            templateUrl: 'templates/message-list.html',
            controller: 'MessageListController'
        })
        .when('/:groupId/search', {
            templateUrl: 'templates/search.html',
            controller: 'SearchController'
        })
        .otherwise({
            templateUrl: 'templates/not_found.html',
        });
});