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
        var messagesList = dataService.getMessagesList(-$routeParams.groupId, $scope.lastPost, 5);
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
    $scope.loadMessages();
    // todo remove stub
    // addMessages(JSON.parse("[{\"id\":3,\"from_id\":97384177,\"to_id\":-153151145,\"date\":1505043607000,\"marked_as_ads\":0,\"post_type\":\"post\",\"text\":\"Poker Stars\",\"can_delete\":1,\"attachment\":{\"type\":\"photo\",\"photo\":{\"pid\":456239017,\"aid\":-7,\"owner_id\":-153151145,\"user_id\":100,\"src\":\"https://pp.userapi.com/c840733/v840733510/59c0/RT_N649y-aA.jpg\",\"src_big\":\"https://pp.userapi.com/c840733/v840733510/59c1/3j6BcJ83ttw.jpg\",\"src_small\":\"https://pp.userapi.com/c840733/v840733510/59bf/WQnmX5eQgqQ.jpg\",\"src_xbig\":\"https://pp.userapi.com/c840733/v840733510/59c2/hz2tIpI9ExA.jpg\",\"src_xxbig\":\"https://pp.userapi.com/c840733/v840733510/59c3/TxYsNswELxk.jpg\",\"src_xxxbig\":\"https://pp.userapi.com/c840733/v840733510/59c4/yx4wkgvrie4.jpg\",\"width\":1620,\"height\":2160,\"text\":\"\",\"created\":1505043607,\"post_id\":3,\"access_key\":\"729eaadb10113fdef6\"}},\"attachments\":[{\"type\":\"photo\",\"photo\":{\"pid\":456239017,\"aid\":-7,\"owner_id\":-153151145,\"user_id\":100,\"src\":\"https://pp.userapi.com/c840733/v840733510/59c0/RT_N649y-aA.jpg\",\"src_big\":\"https://pp.userapi.com/c840733/v840733510/59c1/3j6BcJ83ttw.jpg\",\"src_small\":\"https://pp.userapi.com/c840733/v840733510/59bf/WQnmX5eQgqQ.jpg\",\"src_xbig\":\"https://pp.userapi.com/c840733/v840733510/59c2/hz2tIpI9ExA.jpg\",\"src_xxbig\":\"https://pp.userapi.com/c840733/v840733510/59c3/TxYsNswELxk.jpg\",\"src_xxxbig\":\"https://pp.userapi.com/c840733/v840733510/59c4/yx4wkgvrie4.jpg\",\"width\":1620,\"height\":2160,\"text\":\"\",\"created\":1505043607,\"post_id\":3,\"access_key\":\"729eaadb10113fdef6\"}}],\"comments\":{\"count\":0},\"likes\":{\"count\":0},\"reposts\":{\"count\":0}},{\"id\":2,\"from_id\":11089496,\"to_id\":-153151145,\"date\":1505043589000,\"marked_as_ads\":0,\"post_type\":\"post\",\"text\":\"Пепси девять Карл кошмар\",\"can_delete\":1,\"comments\":{\"count\":0},\"likes\":{\"count\":0},\"reposts\":{\"count\":0}},{\"id\":1,\"from_id\":-153151145,\"to_id\":-153151145,\"date\":1504879607000,\"marked_as_ads\":0,\"post_type\":\"post\",\"text\":\"фывфыв\",\"can_delete\":1,\"can_pin\":1,\"comments\":{\"count\":0},\"likes\":{\"count\":0},\"reposts\":{\"count\":0}}]"));
    
    function reloadMessages() {
        $scope.messages = [];
        $scope.lastPost = 0;
        $scope.loadMessages();
    }

    function addMessages(messages) {
        $scope.messages = $scope.messages.concat(messages);
        $scope.lastPost+=messages.length;
    }

    function loadMessagesMetadata(messageList) {
        let ownerIdList = messageList.map(msg => {
           return msg.from_id;
        });
        dataService.getMetadataByGroup(ownerIdList)
            .then(function (data) {
                messageList.forEach(msg => {
                    let found = data.find(meta => {
                        return meta.gid === Math.abs(msg.from_id);
                    });
                    if (found !== undefined) {
                        msg.meta = {
                            id: found.gid,
                            photo: found.photo,
                            ownerName: found.name
                        };
                    }
                });
            });

        dataService.getMetadataByUser(ownerIdList)
            .then(function (data) {
                if (data !== undefined) {
                    messageList.forEach(msg => {
                        let found = data.find(meta => {
                            return meta.uid === msg.from_id;
                        });
                        if (found !== undefined) {
                            msg.meta = {
                                id: found.uid,
                                photo: found.photo_50,
                                ownerName: (found.first_name + ' ' + found.last_name)
                            };
                        }
                    });
                }
            });

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

    /**
     * Создает новое сообщение
     * @param message
     */
    $scope.repostMessage = function (message) {
        let promise = dataService.postMessage(-$routeParams.groupId, message.text, message.attachments);
        promise.then(function (data) {
            let link = 'https://vk.com/public'
                + $routeParams.groupId
                + '?w=wall-'
                + $routeParams.groupId + '_' + data.post_id;
            reloadMessages();
        }).catch(function (err) {
            alert('Произошла ошибка');
        });
    };
});