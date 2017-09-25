/**
 * Created by lconnected on 30/08/2017.
 */
app.controller('SearchController', function ($controller, $scope, $routeParams, dataService) {
    // $log('hello search');
    $controller('MessageListController', {$scope: $scope});

    $scope.searchText = "";

    /**
     * Загрузка сообщений на страницу
     */
    $scope.loadMessages = function () {
        var messagesList = dataService.getSearchList(-$routeParams.groupId, $scope.searchText, $scope.lastPost, 5);
        if (messagesList !== null) {
            messagesList.then(function (data) {
                var filteredPosts = data.wall
                    .filter(function (wallPost) {
                        return wallPost.id !== undefined;
                    });
                // making valid date
                filteredPosts.forEach((msg) => {
                    msg.date *= 1000;
                });

                loadMessagesMetadata(filteredPosts);
                addMessages(filteredPosts);
            });
        }
    };

    $scope.refresh = function () {
        $scope.messages = [];
        $scope.lastPost = 0;
    };

    $scope.reloadMessages();
});