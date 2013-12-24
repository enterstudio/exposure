/*

    SelectionPreview
    VERSION 0.0.1
    AUTHOR Gavin Lazar Suntop

*/

var SelectionPreview = function (target, options) {
    var self = this,
        defaults,
        option;

    Komponent.mix(self);

    // Options ----------------------------------------------------------------

    defaults = {
        width: 640,
        height: 480
    };

    for (option in options) {
        defaults[option] = options[option] || defaults[option];
    }

    self.options = defaults;

    // Element references -----------------------------------------------------

    self.elCanvas = target;

    // Properties -------------------------------------------------------------

    // Setup ------------------------------------------------------------------

    self.ctx = self.elCanvas.getContext('2d');

    // Event Delegation -------------------------------------------------------

    $(self.elCanvas).on('click', function(event) {
        self.fire('coordinateChosen', {
            x: event.offsetX,
            y: event.offsetY
        });
    });
};

SelectionPreview.prototype = {
    /**
     * Show preview poly
     */
    show: function () {
        var self = this;

    },
    /**
     * Hide preview poly
     */
    hide: function () {
        var self = this;

    },
    /**
     * Set the coordinates of the preview polygon
     * @param {Array} coords An array of arrays with 2 numbers [x, y]
     */
    setShape: function (coords) {
        var self = this;

    },
    /**
     * Set the position of the preview poly
     * @param {Number} x X coordinate
     * @param {Number} y Y coordinate
     */
    setPosition: function (x, y) {
        var self = this;

    }
};
