class Field {

  constructor(fieldSize, fieldCellSize) {

    this.fieldSize = fieldSize;
    this.fieldCellSize = fieldCellSize;
    this.fieldPoints = [];
    this.evolution = 0;

    for (let x = 0; x < fieldSize; x++) {
      this.fieldPoints[x] = [];
      for (let y = 0; y < fieldSize; y++) {

        if (x === 0 || y === 0) {
          this.fieldPoints[x][y] = null;
          continue;
        }

        var amplitude = 10;


        var x0 = (x-fieldSize/2);
        var y0 = (y-fieldSize/2);

        var xmin = -10;
        var xmax = 10;


        var ymin = -10;
        var ymax = 10;


        /*
        var dX = pow(x0, 2)-pow(y0, 2)-4;
         var dY = 2*(x0)*y0;
         */

        /*
        var dX = cos((x0 - y0)/2)*15;
         var dY = sin((x0 + y0)/2)*15;
         */

        /*        var dX = y0;
         var dY = -x0;
         */
        var dX = sin(x0/6)*15;
        var dY = sin(y0/6)*15;

        dX = this.clamp(dX, xmin, xmax);
        dY = this.clamp(dY, ymin, ymax);

        var newX = x * fieldCellSize;
        var newY = y * fieldCellSize;

        var vec = createVector(x0, y0, dX, dY);

        var mapXtoColorR = map(x*fieldCellSize, 1, fieldSize*fieldCellSize, 0, 255);
        var mapXtoColorB = map(y*fieldCellSize, 1, fieldSize*fieldCellSize, 0, 255);

        var _color = color(mapXtoColorR, mapXtoColorB, 255);

        this.fieldPoints[x][y] = new PointData(x * fieldCellSize, y * fieldCellSize, dX, dY, _color);
      }
    }
  }



  clamp(value, min, max) {
    if (value < min) {
      return min;
    } else if (value > max) {
      return max;
    }
    return value;
  }

  drawFields() {
    for (let x = 0; x < this.fieldSize; x++) {
      for (let y = 0; y < this.fieldSize; y++) {

        var pointData = this.fieldPoints[x][y];

        if (pointData == null) {
          continue;
        }
        this.drawArrow(pointData, createVector(-pointData.dx, -pointData.dy));
      }
    }
  }


  updateDeltas() {

    this.evolution += 0.1;

    for (let x = 0; x < this.fieldSize; x++) {
      for (let y = 0; y < this.fieldSize; y++) {

        if (x === 0 || y === 0) {
          continue;
        }

        var pointData = this.fieldPoints[x][y];

        var x0 = (x-this.fieldSize/2);
        var y0 = (y-this.fieldSize/2);


        var dX = sin((x0+this.evolution)/2)*15;
        var dY = sin((y0+this.evolution)/2)*15;


        pointData.dx = dX;
        pointData.dy = dY;
      }
    }
  }

  drawArrow(pointData, vec) {
    push();
    fill(pointData._color);
    stroke(pointData._color);
    strokeWeight(0.05);
    circle(pointData.x, pointData.y, 1);
    fill(pointData._color);
    translate(pointData.x, pointData.y);
    strokeWeight(0.5);
    line(0, 0, vec.x, vec.y);
    rotate(vec.heading());
    let arrowSize = 2;
    translate(vec.mag() - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
  }
}
