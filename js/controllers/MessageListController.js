/**
 * Created by lconnected on 30/08/2017.
 */
app.controller('app.messageListController', ['$scope', '$controller', '$routeParams', 'groupService',
    function ($scope, $controller, $routeParams, groupService) {
        // $controller('app.baseListController', {$scope: $scope});
        // $scope.searchApi = function () {
        //     return groupService(parseInt($routeParams.groupId))
        //         .getMessagesList($scope.messages.length, $scope.pageSize);
        //
        // };
        var dataSource = groupService($routeParams.groupId);
        // var groups = groupService(parseInt($routeParams.groupId)).getGroupList();
        // console.log('groups: ' + groups);

        // $scope.getNextPage();
        console.log("app.messageListController controller");

    }]);