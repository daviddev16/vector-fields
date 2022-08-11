
const SENOIDAL = 1;
const MAGNETIC = 2;
const CURL = 3;
const WAVING = 4;
const _CUSTOM = -1;

class VectorField {

  constructor(cellSize, verticesSize, constraints, vectorFieldType) {
    this.cellSize = cellSize;
    this.verticesSize = verticesSize;
    this.vectorFieldType = vectorFieldType;
    this.vertices = [];
    this.oldOffx = 0;
    this.oldoffy = 0;
    this.createGrid(0,0);
  }

  createGrid(offX, offY) {
    for (var x = 0; x < this.verticesSize; x++) {
      this.vertices[x] = [];
      for (var y = 0; y < this.verticesSize; y++) {
        if (x === 0 || y === 0) {
          this.vertices[x][y] = null;
          continue;
        }
        var amplitude = 15; /* amplitude do campo de força */
        var frequency = 2;

        var x0 = (x - cellSize / 2) + offX; /* centralizar o eixo X do vertice para o centro da tela */
        var y0 = (y - cellSize / 2) + offY; /* centralizar o eixo Y do vertice para o centro da tela */

        var dX = 0; /* dX = x1 */
        var dY = 0; /* dY = y1 */

        switch (this.vectorFieldType) {
        case SENOIDAL:
          dX = sin(x0 * 1/6) * 15; /* sin(x0 * frequency) * amplitude */
          dY = sin(y0 * 1/6) * 15;
          break;
        case CURL:
          dX = y0*2;
          dY = -x0*2;
          break;
        case MAGNETIC:
          dX = pow(x0, 2)-pow(y0, 2)-4;
          dY = 2*(x0)*y0;
          break;
        case WAVING:
          dX = cos((x0 - y0) * 1/frequency) * amplitude;
          dY = sin((x0 + y0) * 1/frequency) * amplitude;
          break;
        }

        /* limitar tamanho do vetor */
        dX = this.clamp(dX, constraints.xMin, constraints.xMax);
        dY = this.clamp(dY, constraints.yMin, constraints.yMax);

        /* colorir campo */
        var mapXtoColorR = map(x * this.cellSize, 1, this.cellSize * this.verticesSize, 0, 255);
        var mapXtoColorB = map(y * this.cellSize, 1, this.cellSize * this.verticesSize, 0, 255);
        var _color = color(mapXtoColorR, mapXtoColorB, 255);

        this.vertices[x][y] = new VectorData(x * this.cellSize, y * this.cellSize, dX, dY, _color);
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

  update() {
    this.drawVectors();
  }
  
  updatePos(offX, offY) {
   if(this.oldoffx != offX || this.oldoffy != offY) {
    this.createGrid(offX, offY);
   }
    
  }

  drawVectors() {
    for (let x = 0; x < this.cellSize; x++) {
      for (let y = 0; y < this.cellSize; y++) {
        var vertice = this.vertices[x];
        if (vertice == null || vertice[y] == null) {
          continue;
        }
        this.drawVectorArrow(vertice[y], createVector(-vertice[y].dX, -vertice[y].dY));
      }
    }
  }

  /* criar vector */
  drawVectorArrow(vertice, vec) {
    push();
    fill(vertice._color);
    stroke(vertice._color);
    strokeWeight(0.05);
    circle(vertice.x, vertice.y, 1);
    fill(vertice._color);
    translate(vertice.x, vertice.y);
    strokeWeight(0.5);
    line(0, 0, vec.x, vec.y);
    rotate(vec.heading());
    let arrowSize = 2;
    translate(vec.mag() - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
  }
}
