/*

    SelectionPreview
    VERSION 0.0.1
    AUTHOR Gavin Lazar Suntop

*/

// TODO - deps : geometric-utilities

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

  self.shapeCoords = [];
  self.shapeX = 0;
  self.shapeY = 0;

  // Setup ------------------------------------------------------------------

  self.ctx = self.elCanvas.getContext('2d');

  // Event Delegation -------------------------------------------------------

  $(self.elCanvas).on('click', function (event) {
    self.fire('coordinateChosen', {
      x: event.offsetX,
      y: event.offsetY
    });
  });

  $(self.elCanvas).on('mousemove', function (event) {
    self.setPosition(event.offsetX, event.offsetY);
  });

  $(self.elCanvas).on('mouseleave', function (event) {
    self.hide();
  });
};

SelectionPreview.prototype = {
  /**
   * Hide preview poly
   */
  hide: function () {
    var self = this;

    self.ctx.clearRect(0, 0, self.options.width, self.options.height);

    return self;
  },
  /**
   * Get preview poly's vertices
   * @return {Array} Array of vertices
   */
  getShape: function () {
    var self = this;

    return self.shapeCoords;
  },
  /**
   * Set the coordinates of the preview polygon and display it
   * NOTE: The coordinates are not adjusted for placement on the preview plane
   *       Placement on the preview plane is set separately
   * @param {Array} coords An array of vertex objects e.g. {x:1, y:2}
   */
  setShape: function (coords) {
    var self = this;

    self.shapeCoords = coords;
    self.drawShape();

    return self;
  },
  /**
   * Get preview polygon's coordinates
   * @return {Object} x Number, y Number
   */
  getPosition: function () {
    var self = this;

    return {
      x: self.shapeX,
      y: self.shapeY
    };
  },
  /**
   * Set the position of the preview poly and display it
   * @param {Number} x X coordinate
   * @param {Number} y Y coordinate
   */
  setPosition: function (x, y) {
    var self = this;

    // TODO : This will simplify once migration to object vertexes is done
    var dimensions = geometry.getPolyDimensions(self.shapeCoords);

    // Set cursor in the middle of the shape
    // TODO - set in actual midpoint of polygon
    // This is a bit weird since calling setPosition is more intuitively called with the upper left x and y coordinates
    // Should probably move this centering code out of this method...
    self.shapeX = x - dimensions.width / 2;
    self.shapeY = y - dimensions.height / 2;

    self.drawShape();

    return self;
  },
  /**
   * Draw the preview poly on the canvas
   */
  drawShape: function () {
    var self = this;

    self.hide();

    self.ctx.beginPath();
    self.ctx.moveTo(self.shapeCoords[0].x + self.shapeX, self.shapeCoords[0].y + self.shapeY);

    self.shapeCoords.slice(1).forEach(function (point) {
      self.ctx.lineTo(point.x + self.shapeX, point.y + self.shapeY);
    });

    self.ctx.closePath();
    self.ctx.stroke();

    return self;
  }
};
