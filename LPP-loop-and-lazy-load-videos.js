// HTML for Bootstrap container

<div class="container gifs">
<div class="row" id="gifsBox">

</div>
</div>

//JS creating all the divs with videos:

 var gifsArray = [
        {poster: "2.jpg",
            video: "2.mp4"},
        {poster: "3.jpg",
            video: "3.mp4"},
        {poster: "4.jpg",
            video: "4.mp4"}
            ]
//etc..

jQuery.each(gifsArray, function (i, obj){
        jQuery('#gifsBox').append(
            '<div class="col-xs-12 col-sm-4 box--gif">' +
            '<video class="video unseen" width="100%" preload="none" loop poster="/LPP-SERVER-PATH/assets/img/'
            + obj.poster + '">' +
            '<source src="LPP-SERVER-PATH/assets/video/'
            + obj.video + '" type="video/mp4"/>' +
            '</video></div>'
        )
    });
    jQuery('.box--gif:nth-child(3n-1) > video').css('margin-top', '60px');
   
//Lazy-load effect

jQuery(window).on('scroll', function () {
        var scrollTop = jQuery(window).scrollTop();
        
        jQuery('.video').each(
            function () {
                var offset = jQuery(this).offset().top;

                if (scrollTop > (offset - window.outerHeight / 1.5) && jQuery(this).hasClass('unseen')) {
                    jQuery(this).removeClass('unseen');
                    var video = jQuery(this)[0];
                    video.load();
                    video.play();
                }
            }
        )
    });
    
    
//JEŚLI MAM TABLICĘ Z TABLICAMI:

var json = [[1, 2, 3], [4, 5, 6], [7]];

$.each(json, function (i, array){
        $('#here').append('<div class="box" id="' + i + '">');
        $.each(array, function (j, val) {
            $('#' + i).append("<div class='box-red'><p>" + val + "</p></div>")
        })
        $('#here').append('</div>')
    })
    
    
