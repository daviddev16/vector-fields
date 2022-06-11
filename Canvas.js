
const CELL_SIZE = 30;
const FIELDS_COUNT = 20;


let global_translation_x;
let global_translation_y;

let forceField;

let offset;

function setup() {
  createCanvas(600, 600);
  forceField = new Field(FIELDS_COUNT, CELL_SIZE);

}


function drawGizmos() {

  strokeWeight(0.2);
  stroke(255);
  line(0, height/2, width+(CELL_SIZE*FIELDS_COUNT)/2, height/2);
  line(width/2, 0, width/2, height);
}

function draw() {
  background(0);
  frameRate(50);
  
  push();
  translate(width/2 - (CELL_SIZE*FIELDS_COUNT)/2, height/2 - (CELL_SIZE*FIELDS_COUNT)/2);

  forceField.drawFields();
  pop();
  
  drawGizmos();

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

function mouseScreenToWorld() {
  return createVector(mouseX/GLOBAL_SCALE - global_translation_x/2, mouseY/GLOBAL_SCALE  - global_translation_y/2);
}
