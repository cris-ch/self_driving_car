class Car {         // Box2D library is good for simulating the physics of a car. Could also try to use.
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = 0;
    this.acceleration = 0.2;
    this.maxSpeed = 2;
    this.friction = 0.05;

    this.angle = 0;


    this.sensor = new Sensor(this);
    this.control = new Controls();
  }

  update(roadBorders) {
    this.#move();
    this.sensor.update(roadBorders);
  }

  #move() {
    if (this.control.forward) {
      this.speed += this.acceleration;
    }

    if (this.control.reverse) {
      this.speed -= this.acceleration;
    }

    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }

    if (this.speed < -this.maxSpeed / 2) {
      this.speed = -this.maxSpeed / 2;
    }

    if (this.speed > 0) {
      this.speed -= this.friction;
    }

    if (this.speed < 0) {
      this.speed += this.friction;
    }

    if (Math.abs(this.speed) < this.friction) {
      this.speed = 0;
    }

    if (this.speed != 0) {
      const flip = this.speed > 0 ? 1 : -1; //used to reverse control when car goes backwards
      if (this.control.right) {
        this.angle -= 0.03 * flip;
      }

      if (this.control.left) {
        this.angle += 0.03 * flip;
      }
    }

    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
  }

  draw(ctx) {
    //ctx is defined in main.js
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(-this.angle);

    ctx.beginPath();
    ctx.rect(
      //draws rectangle
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    ctx.fill();

    ctx.restore();

    this.sensor.draw(ctx);
  }
}
