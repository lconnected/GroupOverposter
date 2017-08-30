/**
 * Created by lconnected on 30/08/2017.
 */
app.controller('app.groupSelectController', ['$scope', '$location', 'groupService', function ($scope, $location, groupService) {
    let availGroups = groupService.getGroupList()
        .map(function (group) {
            return {
                id: group.gid,
                name: group.name
            }
        });
    $scope.data = {
        availableOptions: availGroups,
        selectedOption: availGroups[0]
    };

    $scope.update = function(newValue) {
        $location.path("/" + newValue.id)
    }
}]);
