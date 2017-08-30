/**
 * Created by lconnected on 30/08/2017.
 */
app.controller('app.groupSelectController', ['$scope', '$location', function ($scope, $location) {
    $scope.data = {
        availableOptions: availableGroups,
        selectedOption: defaultGroup
    };

    $scope.update = function(newValue) {
        $location.path("/" + newValue.id)
    }
}]);
