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

    self.ctx.fillStyle = '#000';
    self.ctx.fillRect(0, 0, self.options.width, self.options.height);

    // Event Delegation -------------------------------------------------------

};

SelectionPreview.prototype = {
    show: function () {
        var self = this;

    },
    hide: function () {
        var self = this;

    },
    setShape: function (coords) {
        var self = this;

    },
    setPosition: function (x, y) {
        var self = this;

    }
};
