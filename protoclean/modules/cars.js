import Car from "./car.js";

export default class Cars {

  constructor(ctx, config) {
    this.ctx = ctx;
    this.config = config;
    this.cars = {};
    this.types = 0;
    this.spawnTime = 0;
    this._init();
  }

  _init() {
    this.spawnCar();
  }

  spawnCar() {
    const car = new Car();
    this.cars[car.id] = car;
  }

  checkLife() {
    let id, car;
    for (id in this.cars) {

      car = this.cars[id]
      if (Date.now() - car.spawnTime >= car.lifeTime) this.deleteCar(id)
    }
  }

  deleteCar(id) {
    if (!this.cars[id]) return;

    delete this.cars[id]
  }

  drow(bg, x, y, w, h) {
    this.ctx.drawImage(bg, x, y, w, h)
  }

  updateConfig({spawnTime, types}) {
    this.spawnTime = spawnTime;
    this.types = types;
  }

}