if (typeof window.VIDEO !== 'undefined') {
    throw 'VIDEO already in use.';
}

window.VIDEO = {
    init: function () {
        var self = this;

        // ELEMENT REFERENCES

        self.elVideo = document.querySelector('video');

        // SETUP

        window.URL = window.URL || window.webkitURL;
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

        if (navigator.getUserMedia) {
            navigator.getUserMedia({audio: true, video: true}, function(stream) {
                self.elVideo.src = window.URL.createObjectURL(stream);
            }, function () {
                throw('getUserMedia not available');
            });
        }
    }
};

$(document).ready(function () {
    VIDEO.init();
});