var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player,
    player2,
    player3;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('yt-video-before', {
        height: '1280',
        width: '720',
        videoId: 'GzUeZGOs8Gk',
        playerVars: {
            'rel': '0',
            'controls': '1',
            'showinfo': '0'
        },
        events: {
            'onReady': onReadyEventHandler
        }
    });
    player2 = new YT.Player('yt-video-eyes', {
        height: '1280',
        width: '720',
        videoId: '0wdK-uYdmb0',
        playerVars: {
            'rel': '1',
            'controls': '1',
            'showinfo': '0'
        },
        events: {
            'onReady': onReadyEventHandler
        }
    });
    player3 = new YT.Player('yt-video-life', {
        height: '1280',
        width: '720',
        videoId: 'IH6fbVdabg0',
        playerVars: {
            'rel': '1',
            'controls': '1',
            'showinfo': '0',
            'vq': 'hd1080'
        },
        events: {
            'onReady': onReadyEventHandler
        }
    });

}

jQuery('#unMute').on("click", function(){player.unMute()});

function onReadyEventHandler(event) {
    stopPlayer(event.target);
}
function stopPlayer(playerName) {
    if (!playerName || !(playerName instanceof YT.Player) || !playerName.B) {
        return;
    }
    playerName.pauseVideo();
    playerName.mute();
}

function playPlayer(playerName) {
    if (!playerName || !(playerName instanceof YT.Player) || !playerName.B) {
        return;
    }
    playerName.playVideo();
}
(function($, window) {
    var win = $(window);
    $.fn.isOnScreen = function() {
        var viewport = {
            top: win.scrollTop() + win.height() / 2,
            left: win.scrollLeft()
        };
        viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height() / 4;
        var bounds = this.offset();
        bounds.right = bounds.left + this.outerWidth();
        bounds.bottom = bounds.top + this.outerHeight();
        bounds.top = bounds.top + this.outerHeight() / 3;
        return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
    };
    var visible1Play = 0,
        visible2Play = 0,
        visible3Play = 0;
    win.scroll(function() {
        var video1 = document.getElementById('yt-video-before'),
            video2 = document.getElementById('yt-video-eyes'),
            video3 = document.getElementById('yt-video-life'),
            visible1 = $(video1).isOnScreen(),
            visible2 = $(video2).isOnScreen(),
            visible3 = $(video3).isOnScreen();
        if (visible1) {
            visible1Play += 1;
            if (visible1Play < 2) {
                playPlayer(player)
            }
        } else {
            stopPlayer(player);
        }
        if (visible2) {
            visible2Play += 1;
            if (visible2Play < 2) {
                playPlayer(player2)
            }
        } else {
            stopPlayer(player2);
        }
        if (visible3) {
            visible3Play += 1;
            if (visible3Play < 2) {
                playPlayer(player3)
            }
        } else {
            stopPlayer(player3);
        }
    });
})(jQuery, window);
