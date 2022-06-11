class Particle {

  constructor(initX, initY) {
    this.posX = initX;
    this.posY = initY;
    this.directionX = 0;
    this.directionY = 0;
    this.accelerationX = 1;
    this.accelerationY = 1;
  }

  simulate() {
    this.posX = this.accelerationX * this.directionX;
    this.posX = this.accelerationY * this.directionY;
  }

  changeDirection(dirX, dirY) {
    this.directionX = dirX;
    this.directionY = dirY;
  }

  drawParticle() {
    fill(255, 255, 0);
    circle(this.posX, this.posY, 2);
  }
}
