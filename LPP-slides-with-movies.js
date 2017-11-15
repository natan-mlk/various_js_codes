// title slide
jQuery('#1').click(function () {
        var windowWidth = jQuery(window).width();
        if (windowWidth > 1024) {
            jQuery('.slide2').show();
            jQuery('.slide1').hide();
        }
    }
);

//movies
var helper = 0;
var helper2 = 0;
var helper3 = 0;

jQuery('.left').click(function () {
    var Id = jQuery(this).parent().attr('id');

    if (Id === "6") {
        jQuery('#6').hide();
        jQuery('#4').show();
    } else if (Id === "11") {
        jQuery('#11').hide();
        jQuery('#9').show();
    } else if (Id === "16") {
        jQuery('#16').hide();
        jQuery('#14').show();
    } else {
        var prev = parseInt(Id) - 1;
        jQuery('#' + Id).hide();
        jQuery('#' + prev).show()
    }
});

jQuery('.right').click(function () {
    var Id = jQuery(this).parent().attr('id');

    if (Id === "4" && helper === 0) {
        helper++;
        jQuery('#4').hide();
        jQuery('#5').show();
        jQuery('#video1').get(0).play();
        setTimeout(function () {
            jQuery('#5').hide();
            jQuery('#6').show()
        }, 3000);

    } else if (Id === "4" && helper !== 0) {
        jQuery('#4').hide();
        jQuery('#5').hide();
        jQuery('#6').show()
    } else if (Id === "9" && helper2 === 0) {
        helper2++;
        jQuery('#9').hide();
        jQuery('#10').show();
        jQuery('#video2').get(0).play();
        setTimeout(function () {
            jQuery('#10').hide();
            jQuery('#11').show()
        }, 3000);
    } else if (Id === "9" && helper2 !== 0) {
        jQuery('#9').hide();
        jQuery('#10').hide();
        jQuery('#11').show()
    } else if (Id === "14" && helper3 === 0) {
        helper3++;
        jQuery('#14').hide();
        jQuery('#15').show();
        jQuery('#video3').get(0).play();
        setTimeout(function () {
            jQuery('#15').hide();
            jQuery('#16').show()
        }, 3000);
    } else if (Id === "14" && helper3 !== 0) {
        jQuery('#14').hide();
        jQuery('#15').hide();
        jQuery('#16').show()
    } else {
        var next = parseInt(Id) + 1;
        jQuery('#' + Id).hide();
        jQuery('#' + next).show();
    }
});

jQuery('#back').click(function () {
    jQuery('#20').hide();
    jQuery('#1').show();
})

// fullscreen video CSS

  video {
    position: absolute;
    bottom: 0;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
