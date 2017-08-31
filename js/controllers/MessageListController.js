/**
 * Created by lconnected on 30/08/2017.
 */
app.controller('MessageListController', function ($scope, $controller, groupService, $routeParams) {
    var messagesList = groupService.getMessagesList($routeParams.groupId, 0, 10);
    if (messagesList !== null) {
        messagesList.then(function (data) {
            var filteredPosts = data.wall.filter(function (wallPost) {
                return wallPost.id !== undefined;
            });
            addMessages(filteredPosts);
        });
    }
    function addMessages(messages) {
        $scope.messages = messages;
    }
});