var geometry = {
    /**
     * Get the width and height of a polygon
     * @param  {Array} points An array of vertex objects ie: {x:Number, y:Number}
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
        }
    }
}
