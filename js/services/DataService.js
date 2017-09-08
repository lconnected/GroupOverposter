/**
 * Service that provides data access to groups and group walls
 * Created by lconnected on 30/08/2017.
 */
app.factory('dataService', function ($q) {

    var service = {

        data: {},
        appID: APP_ID,
        online: false,

        /**
         * Initialize vk api tunnel
         */
        init: function () {
            try {
                VK.init({apiId: this.appID});
                this.online = true;
            } catch (err) {
                console.error("Couldn't connect to VK");
            }
        },

        /**
         * Get managed groups for current user
         * @returns {promise|e.promise}
         */
        getGroupList: function () {
            var deferred = $q.defer();
            var query = {
                extended: 1,
                filter: 'moder',
                fields: 'can_post,can_see_all_posts'
            };
            VK.api('groups.get', query,
                function fillGroups(data) {
                    deferred.resolve(data.response);
                });
            return deferred.promise;
        },

        getMessagesList: function (fromGroupId, offset, count) {
            if (fromGroupId == 0) {
                return null;
            }
            var def = $q.defer();
            var query = {
                owner_id: fromGroupId,
                filter: "all",
                extended: 1,
                offset: offset,
                count: count
            };
            VK.api('wall.get', query,
                function (data) {
                    def.resolve(data.response);
                });

            return def.promise;
        },

        /**
         * Дополнение сообщений аватарами
         * @param ownerId
         * @returns {*}
         */
        getAvatars: function (ownerId) {

            let req;
            let funcName;
            if (ownerId < 0) {
                //запрос информации по группе
                req = {
                    group_ids: -ownerId
                };
                funcName = 'groups.getById';
            } else {
                //по пользователю
                req = {
                    user_ids: ownerId,
                    fields: 'photo_50'
                };
                funcName = 'users.get';
            }

            var deferred = $q.defer();
            VK.api(funcName, req,
                function (data) {
                    deferred.resolve(data.response);
                });

            return deferred.promise;
        },

        getSearchList: function (fromGroupId, queryText, offset, count) {
            console.log("service");
            var def = $q.defer();

            var query = {
                owner_id: fromGroupId,
                query: queryText,
                extended: 1,
                offset: offset,
                count: count
            };
            VK.api('wall.search', query,
                function (r) {
                    var resp = r.response;
                    def.resolve(resp);
                });

            return def.promise;
        },

        getMessagesById: function (id) {
            console.log("service getMessagesById");
            var def = $q.defer();

            var query = {
                posts: id,
                extended: 1
            };
            VK.api('wall.getById', query,
                function (r) {
                    var resp = r.response;
                    def.resolve(resp);
                });

            return def.promise;
        },

        getAttachmentsInString: function (attachments) {
            return attachments
                .map(function (attach) {
                    var attachType = attach.type;
                    var attachment = attach[attachType];
                    return attachType + attachment.owner_id + "_" + (!!attachment.pid ? attachment.pid : attachment.vid)
                }).join();
        },

        postMessage: function (toGroupId, message, attachments) {
            var deferred = $q.defer();
            message = message.replace(/<br>/g, "\n");
            var requestParams = {
                owner_id: toGroupId,
                from_group: 1,
                signed: 1,
                message: message
            };

            if (attachments !== undefined) {
                requestParams.attachments = this.getAttachmentsInString(attachments);
            }

            VK.api('wall.post', requestParams,
                function (response) {
                    var resp = response.response;
                    deferred.resolve(resp);
                });

            return deferred.promise;
        },

        ranges: [
            '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
            '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
            '\ud83d[\ude80-\udeff]'  // U+1F680 to U+1F6FF
        ].join('|'),

        /**
         * removes emoji from text
         * @param message text
         * @returns {*|string|XML|void}
         */
        escapeEmoji: function(message) {
            return message.replace(new RegExp(this.ranges, 'g'), '');
        },

        /**
         * cuts message to fixed amount of words
         * @param message
         */
        cutMessage: function (message) {
            //TODO implement message cutting
        }

    };
    service.init();
    return service;
});