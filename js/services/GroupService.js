/**
 * Service that provides data access to groups and group walls
 * Created by lconnected on 30/08/2017.
 */
app.factory('groupService', function ($q) {

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
                owner_id: -fromGroupId,
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
            var def = $q.defer();
            message = stripEmoji(message.replace(/<br>/g, "\n"));
            var requestParams = {
                owner_id: toGroupId,
                from_group: 1,
                signed: 1,
                message: message
            };

            if (!!attachments) {
                requestParams.attachments = this.getAttachmentsInString(attachments);
            }

            VK.api('wall.post', requestParams,
                function (r) {
                    var resp = r.response;
                    def.resolve(resp);
                });

            return def.promise;
        }
    };
    service.init();
    return service;
});