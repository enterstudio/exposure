window.geometry = {
  /**
   * Get the width and height of a polygon's bounding box
   * @param  {Array} points An array of vertex objects e.g. {x:Number, y:Number}
   * @return {Object} An object describing the polygons dimensions {width:Number, height:Number}
   */
  getPolyDimensions: function (points) {
    var smallestX = 0,
      largestX = 0,
      smallestY = 0,
      largestY = 0;

    points.forEach(function (point) {
      if (point.x < smallestX) {
        smallestX = point.x;
      }

      if (point.y < smallestY) {
        smallestY = point.y;
      }

      if (point.x > largestX) {
        largestX = point.x;
      }

      if (point.y > largestY) {
        largestY = point.y;
      }
    });

    return {
      width: largestX - smallestX,
      height: largestY - smallestY
    };
  },
  /**
   * Convert an array of vertex arrays into an array of vertex objects
   * @param  {Array} points An array of two member vertex arrays e.g. [[0,1], [10,1]]
   * @return {Array} An array of vertex objects e.g. [{x:1, y:2}, {x:9, y:20}]
   */
  pointArrayToObjectArray: function (points) {
    var objectArray = [];

    points.forEach(function (point) {
      objectArray.push({
        x: point[0],
        y: point[1]
      });
    });

    return objectArray;
  },
  /**
   * Generate a random polygon
   * @param  {Number} vertices Number of vertices in the polygon
   * @param  {Number} maxWidth Maximum height of the polygon
   * @param  {Number} maxHeight Maximum width of the polygon
   * @return {Array} An array of vertex objects {x:Number, y:Number} defining the generated polygon
   */
  createRandomPolygon: function (vertices, maxWidth, maxHeight) {
    var shape = [];

    for (var i = 0; i < vertices; i++) {
      shape.push({
        x: Math.random() * maxWidth,
        y: Math.random() * maxHeight
      });
    }

    return shape;
  }
};
