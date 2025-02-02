// YouTube Background Video
function onYouTubeIframeAPIReady() {
    new YT.Player('youtube-background-video', {
        videoId: 'RgKOj0pU8sA', // Indian Olympic Highlights video
        playerVars: {
            autoplay: 1,
            controls: 0,
            showinfo: 0,
            mute: 1,
            loop: 1,
            playlist: 'RgKOj0pU8sA'
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        event.target.playVideo();
    }
}

// Fallback in case YouTube API doesn't load
window.addEventListener('load', function() {
    if (typeof YT === 'undefined') {
        console.warn('YouTube API failed to load. Falling back to static background.');
        document.querySelector('.hero-media-background').style.background = 'linear-gradient(135deg, #2C5EF0 0%, #00B4DB 100%)';
    }
});
