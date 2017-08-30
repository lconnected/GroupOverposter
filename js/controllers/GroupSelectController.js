/**
 * Created by lconnected on 30/08/2017.
 */
app.controller('GroupSelectController', ['$scope', '$location', 'groupService', function ($scope, $location, groupService) {
    console.log('GroupSelectController init');

    let availGroups;
    if(groupService.online) {
        availGroups = groupService.getGroupList()
            .then(function (data) {
                availGroups = data.map(function (group) {
                    return {
                        id: group.gid,
                        name: group.name
                    }
                });
            });
    } else {
        availGroups = [{id: 1, name: 'gus'}]; // stub
    }

    $scope.data = {
        availableOptions: availGroups,
        selectedOption: availGroups[0]
    };

    $scope.update = function(newValue) {
        $location.path("/" + newValue.id)
    }
}]);
