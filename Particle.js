class Particle {

  constructor() {
    this.position = createVector(CELL_SIZE + random(width), CELL_SIZE + random(height));
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.maxSpeed = 1;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    
    if(this.position.x < 0 || this.position.x > width || this.position.y < 0 || this.position.y > height){
     this.position = createVector(random(width), random(height)); 
    }
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  applyForceByFields(fieldPoints) {
    var x = floor(this.position.x / CELL_SIZE);
    var y = floor(this.position.y / CELL_SIZE);

    if (x < 0 || y < 0 || x > CELL_SIZE*FIELDS_COUNT-1 || y > CELL_SIZE*FIELDS_COUNT-1) {
      return;
    }

    if (fieldPoints[x] == null ||  fieldPoints[x][y] == null) {
      return;
    }

    var fieldPoint = fieldPoints[x][y];

    var force = createVector(-fieldPoint.dx, -fieldPoint.dy);
    this.applyForce(force);
  }

  drawParticle() {
    stroke(255);
    strokeWeight(0.2);
    circle(this.position.x, this.position.y, 1);
  }
}
