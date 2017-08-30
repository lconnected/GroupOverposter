/**
 * Created by lconnected on 30/08/2017.
 */
app.controller('MessageListController', ['$scope', '$controller', '$routeParams',
    function ($scope, $controller, $routeParams) {
        // $controller('app.baseListController', {$scope: $scope});
        // $scope.searchApi = function () {
        //     return groupService(parseInt($routeParams.groupId))
        //         .getMessagesList($scope.messages.length, $scope.pageSize);
        //
        // };
        // var dataSource = groupService($routeParams.groupId);
        // var groups = groupService(parseInt($routeParams.groupId)).getGroupList();
        // console.log('groups: ' + groups);

        // $scope.getNextPage();
        console.log("MessageListController init");

    }]);