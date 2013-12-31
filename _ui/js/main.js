/*

TODO:

Use module loader for:

jquery
selection-preview
geometric-utils

 */

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
        self.elCanvas = document.querySelector('.pane.destination canvas');

        self.$btnLine = $('button.line');
        self.$btnPixel = $('button.pixel');

        // PROPERTIES

        self.ctx = self.elCanvas.getContext('2d');
        self.drawInterval = undefined;
        self.isDrawing = false;

        // SETUP

        // Canvas Setup

        // self.ctx.fillStyle = '#fff';
        // self.ctx.fillRect(0, 0, self.options.width, self.options.height);

        // Setup Webcam

        window.URL = window.URL || window.webkitURL;
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

        if (navigator.getUserMedia) {
            navigator.getUserMedia({
                audio: true,
                video: true
            }, function (stream) {
                self.elVideo.src = window.URL.createObjectURL(stream);
            }, function () {
                throw ('getUserMedia not available');
            });
        }

        // Setup Selection Preview

        var selectionPreview = new SelectionPreview(document.querySelector('.pane.preview canvas'));

        // EVENT HANDLERS

        self.$btnLine.click(function (event) {
            self.startRowGrab();
        });

        self.$btnPixel.click(function (event) {
            self.startPixelGrab();
        });





        function getVisibleSelectionCoords() {
            var shape = selectionPreview.getShape();
            var position = selectionPreview.getPosition();

            var offsetShape = [];

            shape.forEach(function (coords) {
                console.log([coords[0] + position.x, coords[1] + position.y]);
                offsetShape.push([coords[0] + position.x, coords[1] + position.y]);
            });

            console.log(shape);

            return offsetShape;
        }

        selectionPreview.setShape(geometry.createRandomPolygon(3, self.options.width / 2, self.options.height / 2));
        selectionPreview.setPosition(0, 0);

        selectionPreview.on('coordinateChosen', function (event) {
            self.updatePolygon(getVisibleSelectionCoords(), 0.75);

            selectionPreview.setShape(geometry.createRandomPolygon(3, self.options.width / 2, self.options.height / 2));
            selectionPreview.setPosition(event.x, event.y);
        });
    },
    updatePixel: function (x, y) {
        var self = this;

        self.ctx.drawImage(self.elVideo, x, y, 1, 1, x, y, 1, 1);
    },
    updateRow: function (y, opacity) {
        var self = this;

        opacity = opacity || 1;

        self.ctx.globalAlpha = opacity;
        self.ctx.drawImage(self.elVideo, 0, y, self.options.width, 1, 0, y, self.options.width, 1);
    },
    updateCircle: function (x, y, radius) {
        var self = this;

        self.ctx.save();
        self.ctx.beginPath();
        self.ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        self.ctx.clip();
        self.ctx.drawImage(self.elVideo, 0, 0, self.options.width, self.options.height);
        self.ctx.restore();
    },
    /**
     * Capture a polygonal shape from the video feed and render it onto the canvas
     * @param  {Array} points An array of arrays containing two Number values for x and y coords
     */
    updatePolygon: function (points, opacity) {
        var self = this;

        if (points.length < 3) {
            throw 'Polygons must have at least 3 points';
        }

        opacity = opacity || 1;

        self.ctx.save();
        self.ctx.beginPath();
        self.ctx.moveTo(points[0][0], points[0][1]);

        for (var i = 1; i < points.length; i++) {
            self.ctx.lineTo(points[i][0], points[i][1]);
        }

        self.ctx.closePath();
        self.ctx.clip();
        self.ctx.globalAlpha = opacity;
        self.ctx.drawImage(self.elVideo, 0, 0, self.options.width, self.options.height);
        self.ctx.restore();
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
                    self.updatePixel(x, y);
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
