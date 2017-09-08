/**
 * Controls the available group list in view
 * Created by lconnected on 30/08/2017.
 */
app.controller('GroupSelectController', function ($scope, $location, dataService) {

    // Load available groups and call update method for view component
    if(dataService.online) {
        availGroups = dataService.getGroupList()
            .then(function (data) {
                var availGroups = data.filter(function (group) {
                    return group.gid !== undefined;
                }).map(function (group) {
                    return {
                        id: -group.gid,
                        name: group.name
                    }
                });
                updateGroupList(availGroups);
            });
    } else {
        availGroups = [{id: -1, name: 'gus'}, {id: -23, name: 'kosar'}]; // stub
        updateGroupList(availGroups);
    }

    /**
     * Updates groups list by new entities
     * @param groups
     */
    function updateGroupList(groups) {
        $scope.data = {
            availableOptions: groups,
            selectedOption: groups[0]
        };
        $location.path(CONTEXT_PATH + -groups[0].id);
    }

    /**
     * updates location when new group selected
     * @param newValue
     */
    $scope.update = function(newValue) {
        $location.path(CONTEXT_PATH + -newValue.id)
    }
});
