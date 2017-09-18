/**
 * Created by lconnected on 30/08/2017.
 */
app.controller('SearchController', function ($scope, $controller, $routeParams, dataService) {
        $controller('app.baseListController', {$scope: $scope});

        $scope.queryText = "";

        $scope.search = function (keyEvent) {
            if (keyEvent.which === 13) {
                $scope.messages = [];
                $scope.groups = [];
                $scope.profiles = [];
                $scope.isListFull = false;
                $scope.getNextPage();
            }
        };

        $scope.searchApi = function () {
            return groupServiceFactory(parseInt($routeParams.groupId))
                .getSearchList($scope.queryText, $scope.messages.length, $scope.pageSize)
        };
    });