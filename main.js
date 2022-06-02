const canvas = document.getElementById("myCanvas");
canvas.width = 200;

const ctx = canvas.getContext("2d");  //returs a drawing context. 2d means it's a two-dimensional rendering context. 
const car = new Car(100, 100, 30, 50);

animate();

function animate() {
  car.update();
  canvas.height = window.innerHeight;   //refreshes the canvas so we see the car position in the actual frame
  car.draw(ctx);
  requestAnimationFrame(animate); //requests browser to update animation before next repaint. Calls animate function to animate another frame at next repaint.
}
