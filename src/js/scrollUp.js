$(window).scroll(function() {
    var height = $(window).scrollTop();
    if (height > 100) {
        $('#back2top').fadeIn();
    } else {
        $('#back2top').fadeOut();
    }
});
$(document).ready(function() {
    $("#back2top").click(function(event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });

});