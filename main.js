const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;
const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 300;

const carCtx = carCanvas.getContext("2d"); //returs a drawing context. 2d means it's a two-dimensional rendering context.
const networkCtx = networkCanvas.getContext("2d")
const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);
const car = new Car(road.getLaneCenter(1), 100, 30, 50, "AI");
const traffic = [new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2)];

animate();

function animate(time) {
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []); //empty arrays so traffic doesn't interact with other
  }
  car.update(road.borders, traffic);

  carCanvas.height = window.innerHeight; //refreshes the canvas so we see the car position only in the current frame
  networkCanvas.height = window.innerHeight;
  carCtx.save();
  carCtx.translate(0, -car.y + carCanvas.height * 0.7); //follow the car

  road.draw(carCtx);
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(carCtx, "red");
  }
  car.draw(carCtx, "blue");

  carCtx.restore();

  networkCtx.lineDashOffset = - time / 50;
  Visualizer.drawNetwork(networkCtx, car.brain);
  requestAnimationFrame(animate); //requests browser to update animation before next repaint. Calls animate function to animate another frame at next repaint.
}
