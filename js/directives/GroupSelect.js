/**
 * Created by lconnected on 30/08/2017.
 */
app.directive('groupSelect', function (groupService) {
    if (groupService.online) {
        return {
            templateUrl: 'templates/directives/groupSelect.html'
        }
    } else {
        return {
            templateUrl: 'templates/directives/groupsEmpty.html'
        }
    }
});