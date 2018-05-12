$.fn.jqueryFade = function (time) {
        var This = $(this);
        for (var i = 0; i < time; i++) {
            This.fadeOut(500);
            This.fadeIn(500);
        }
    }