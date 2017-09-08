/**
 * Created by lconnected on 30/08/2017.
 */
app.controller('MessageListController', function ($scope, $controller, dataService, $routeParams) {

    $scope.lastPost = 0;
    $scope.messages = [];

    /**
     * Загрузка сообщений на страницу
     */
    $scope.loadMessages = function () {
        var messagesList = dataService.getMessagesList($routeParams.groupId, $scope.lastPost, 5);
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
                addMessages(filteredPosts);
            });
        }
    };
    $scope.loadMessages();

    function addMessages(messages) {
        $scope.messages = $scope.messages.concat(messages);
        $scope.lastPost+=5;
    }

    /**
     * Форматирование сообщения, добавляет фразу, если текст отсутствует.
     * @param message
     * @returns {*}
     */
    $scope.formatMessage = function (message) {
        let formattedMessage = dataService.escapeEmoji(message);
        if (!formattedMessage.length) {
            return "[Текст отсутствует]";
        } else {
            return formattedMessage;
        }
    };

    $scope.getOwner = function (ownerId) {
        return dataService.getOwnerProfile(ownerId);
    };

    /**
     * Создает новое сообщение
     * @param message
     */
    $scope.repostMessage = function (message) {
        let promise = dataService.postMessage($routeParams.groupId, message.text, message.attachments);
        promise.then(function (data) {
            let link = 'https://vk.com/public'
                + $routeParams.groupId
                + '?w=wall-'
                + $routeParams.groupId + '_' + data.response.post_id;
        }).catch(function (err) {
            alert('Произошла ошибка');
        });
    };
});