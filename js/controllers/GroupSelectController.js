/**
 * Created by lconnected on 30/08/2017.
 */
app.controller('GroupSelectController', ['$scope', '$location', 'groupService', function ($scope, $location, groupService) {
    console.log('GroupSelectController init');

    if(groupService.online) {
        availGroups = groupService.getGroupList()
            .then(function (data) {
                var availGroups = data.map(function (group) {
                    return {
                        id: group.gid,
                        name: group.name
                    }
                });
                updateGroupList(availGroups);
            });
    } else {
        availGroups = [{id: 1, name: 'gus'}]; // stub
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
