if (typeof window.VIDEO !== 'undefined') {
    throw 'VIDEO already in use.';
}

window.VIDEO = {
    init: function () {
        var self = this;

        self.options = {
            width: 640,
            height: 480
        };

        // ELEMENT REFERENCES

        self.elVideo = document.querySelector('video');
        self.elImg = document.querySelector('img');
        self.elCanvas = document.querySelector('canvas');

        self.$btnLine = $('button.line');
        self.$btnPixel = $('button.pixel');

        // PROPERTIES

        self.ctx = self.elCanvas.getContext('2d');
        self.drawInterval = undefined;
        self.isDrawing = false;

        // SETUP

        // Canvas Setup

        self.ctx.fillStyle = '#666';
        self.ctx.fillRect(0,0,self.options.width,self.options.height);

        // Setup Webcam

        window.URL = window.URL || window.webkitURL;
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

        if (navigator.getUserMedia) {
            navigator.getUserMedia({audio: true, video: true}, function(stream) {
                self.elVideo.src = window.URL.createObjectURL(stream);
            }, function () {
                throw('getUserMedia not available');
            });
        }

        // EVENT HANDLERS

        self.$btnLine.click(function(event) {
            self.startRowGrab();
        });

        self.$btnPixel.click(function(event) {
            self.startPixelGrab();
        });
    },
    updatePixel: function (x, y) {
        var self = this;

        self.ctx.drawImage(self.elVideo, x, y, 1, 1, x, y, 1, 1);
    },
    updateRow: function (y) {
        var self = this;

        self.ctx.drawImage(self.elVideo, 0, y, self.options.width, 1, 0, y, self.options.width, 1);
    },
    startRowGrab: function () {
        var self = this,
            x = 0,
            y = 0;

        if (!self.isDrawing) {
            self.isDrawing = true;

            self.drawInterval = setInterval(function () {
                if (y < self.options.height) {
                    self.updateRow(y);
                    y++;
                } else {
                    self.stop();
                }
            }, 1);
        }
    },
    startPixelGrab: function () {
        var self = this,
            x = 0,
            y = 0;

        if (!self.isDrawing) {
            self.isDrawing = true;

            self.drawInterval = setInterval(function () {
                if (y < self.options.height && x < self.options.width) {
                    self.updatePixel(x,y);
                    x++;

                    if (x >= self.options.width) {
                        x = 0;
                        y++;
                    }
                } else {
                    self.stop();
                }
            }, 1);
        }
    },
    stop: function () {
        var self = this;

        clearInterval(self.drawInterval);
        self.isDrawing = false;
    }
};

$(document).ready(function () {
    VIDEO.init();
});