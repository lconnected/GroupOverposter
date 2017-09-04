/**
 * Directive shows available groups list or error message
 * Created by lconnected on 30/08/2017.
 */
app.directive('groupSelect', function (dataService) {
    // if (dataService.online) {
        return {
            templateUrl: 'templates/directives/groupSelect.html'
        }
    // } else {
    //     return {
    //         templateUrl: 'templates/directives/groupsEmpty.html'
    //     }
    // }
});