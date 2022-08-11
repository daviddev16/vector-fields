
const CELL_SIZE = 40;
const FIELDS_COUNT = 20;

let global_translation_x;
let global_translation_y;

let forceField;

let offset;

let particle;

let showFields;
let showParticles;

/* new stuff */

let cellSize = 40;
let verticesCount = 20;
let vectorFieldType;
let constraints;
let vectorField;

let offsetX;
let offsetY;


function buildVectorField() {
    vectorFieldType = 4;
    constraints = new Constraints(-30,30,-30,30);
    vectorField = new VectorField(cellSize, verticesCount, constraints, vectorFieldType);
}

function setup() {
  
  let canvas = createCanvas(cellSize * verticesCount, cellSize * verticesCount);
  canvas.parent('canvas_container');
  
  offsetX = createSlider(-10, 10, 0);
  offsetY = createSlider(-10, 10, 0);
  
  buildVectorField();
}


function drawGizmos() {
  strokeWeight(0.2);
  stroke(255);
  line(0, height/2, width+(CELL_SIZE*FIELDS_COUNT)/2, height/2);
  line(width/2, 0, width/2, height);
}

function draw() {
  background(0, 20);
  frameRate(60);

  push();
  translate(width/2 - (CELL_SIZE*FIELDS_COUNT)/2, height/2 - (CELL_SIZE*FIELDS_COUNT)/2);
  vectorField.update();
  vectorField.updatePos(offsetX.value(),offsetY.value());
 /* if (showFields.checked()) {
    forceField.drawFields();
  }
  forceField.updateDeltas();

  if (showParticles.checked()) {
    for (let i = 0; i < particles.length; i++) {
      particles[i].applyForceByFields(forceField.fieldPoints);
      particles[i].update();
      particles[i].drawParticle();
    }
  }

*/
  pop();


//    drawGizmos();
}

/*function mouseMoved(event) {
 var mousePos = mouseScreenToWorld();
 for (let x = 0; x < forceField.fieldSize; x++) {
 for (let y = 0; y < forceField.fieldSize; y++) {
 var pointData = forceField.fieldPoints[x][y];
 var distance = dist(pointData.x, pointData.y, mousePos.x, mousePos.y);
 if (distance <= 10) {
 pointData._color = color(255);
 }
 }
 }
 }*/
