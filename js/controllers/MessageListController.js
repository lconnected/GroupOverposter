/**
 * Created by lconnected on 30/08/2017.
 */
app.controller('MessageListController', function ($scope, $controller, groupService, $routeParams) {
    groupService.getMessagesList($routeParams.groupId, 0, 10)
        .then(function (data) {
            addMessages(data.items);
        });

    function addMessages(messages) {
        $scope.messages = messages;
    }
});