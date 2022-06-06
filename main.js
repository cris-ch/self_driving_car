const canvas = document.getElementById("myCanvas");
canvas.width = 200;

const ctx = canvas.getContext("2d"); //returs a drawing context. 2d means it's a two-dimensional rendering context.
const road = new Road(canvas.width / 2, canvas.width * 0.9);
const car = new Car(road.getLaneCenter(1), 100, 30, 50);

animate();

function animate() {
  car.update();
  canvas.height = window.innerHeight; //refreshes the canvas so we see the car position only in the current frame
  
  ctx.save();
  ctx.translate(0, -car.y + canvas.height * 0.7); //follow the car

  road.draw(ctx);
  car.draw(ctx);

  ctx.restore();
  requestAnimationFrame(animate); //requests browser to update animation before next repaint. Calls animate function to animate another frame at next repaint.
}
