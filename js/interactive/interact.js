/**
 * Created by lkhruschev on 01.09.2017.
 */
$(document).ready(function () {
    let main = $('#main');
    let height = main.closest('iframe').height();
    $('.body-wrapper').css({height: height});
    main.css({height: height - $('#header').height()})
});