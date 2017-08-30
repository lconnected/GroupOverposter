/**
 * Created by lconnected on 30/08/2017.
 */
app.controller('GroupSelectController', ['$scope', '$location', 'groupService', function ($scope, $location, groupService) {

    if(groupService.online) {
        availGroups = groupService.getGroupList()
            .then(function (data) {
                var availGroups = data.filter(function (group) {
                    return group.gid !== undefined;
                }).map(function (group) {
                    return {
                        id: group.gid,
                        name: group.name
                    }
                });
                updateGroupList(availGroups);
            });
    } else {
        availGroups = [{id: 1, name: 'gus'}, {id: 23, name: 'kosar'}]; // stub
        updateGroupList(availGroups);
    }

    function updateGroupList(groups) {
        $scope.data = {
            availableOptions: availGroups,
            selectedOption: availGroups[0]
        };
    }

    $scope.update = function(newValue) {
        $location.path("/" + newValue.id)
    }
}]);
