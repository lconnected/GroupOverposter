contextPath = '/';
appId = 6159447;

function getQueryStringValue(key) {
    return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]"
        + encodeURI(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

var availableGroups = [
    {id: '152271532', name: 'Рукоделие'}
];

var defaultGroup = availableGroups[0];

var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider

    // route for the home page
    //     .when('/', {
    //         templateUrl: 'templates/message-list.html',
    //         controller: 'app.messageListController'
    //     })

        .when('/:groupId', {
            templateUrl: 'templates/message-list.html',
            controller: 'app.messageListController'
        })

        // route for the about page
        // .when('/:groupId/one-post', {
        //     templateUrl: 'templates/one-post.html',
        //     controller: 'app.onePostController'
        // })

        // route for the contact page
        // .when('/:groupId/search', {
        //     templateUrl: 'templates/search.html',
        //     controller: 'app.searchController'
        // })

        .otherwise({
            redirectTo: '/' + defaultGroup.id,
            templateUrl: 'templates/message-list.html',
            controller: 'app.messageListController'
        });
});