/**
 * Created by lconnected on 30/08/2017.
 */
app.factory('groupService', function($q) {
    return function (groupId) {

        var ranges = [
            '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
            '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
            '\ud83d[\ude80-\udeff]'  // U+1F680 to U+1F6FF
        ].join('|');

        function stripEmoji(message) {
            return message.replace(new RegExp(ranges, 'g'), '');
        }


        var vk = {
            data: {},
            appID: 6159447,

            fromGroupId: groupId,
            toGroupId: groupId,

            init: function () {
                VK.init({apiId: vk.appID});
            },

            getGroupList: function () {
                console.log("service getGroupList");
                var def = $q.defer();

                var query = {
                    userId: 11089496,//hardcoded user id
                    extended: 1,
                    filter: 'moder',
                    fields: 'can_post,can_see_all_posts'
                };
                VK.api('groups.get', query,
                    function (data) {
                        var resp = data.response;
                        def.resolve(resp);
                    });

                return def.promise;
            },

            getMessagesList: function (offset, count) {
                console.log("service");
                var def = $q.defer();

                var query = {
                    owner_id: this.fromGroupId,
                    filter: "others",
                    extended: 1,
                    offset: offset,
                    count: count
                };
                VK.api('wall.get', query,
                    function (r) {
                        var resp = r.response;
                        def.resolve(resp);
                    });

                return def.promise;
            },

            getSearchList: function (queryText, offset, count) {
                console.log("service");
                var def = $q.defer();

                var query = {
                    owner_id: this.fromGroupId,
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

            postMessage: function (message, attachments) {
                var def = $q.defer();
                message = stripEmoji(message.replace(/<br>/g, "\n"));
                var requestParams = {
                    owner_id: this.toGroupId,
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
        vk.init();
        return vk;
    };
});