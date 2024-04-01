import Car from "./car.js";

export default class Cars {

  constructor(ctx, config) {
    this.ctx = ctx;
    this.config = config;
    this.cars = {};
    this.types = 1;
    this.spawnTime = null;
    this._init();
  }

  _init() {
    this.spawnCar();
  }

  spawnCar(type) {
    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }
    
    let randomType;
    
    
    if (!type) randomType = Math.ceil(getRandomArbitrary(1, this.types));
    
    let randomSide = Math.round(getRandomArbitrary(1, 4));

    let car = new Car(type ? type : randomType, this.config.lifeTime, randomSide);

    let id, item;
    for (id in this.cars) {
      item = this.cars[id]
      if (car.id === item.id) return;
            
      if (car.loadingX >= item.loadingX -item.loadingW - 10 && car.loadingX <= item.loadingX + item.loadingW + 10) {
        this.spawnCar(randomType)
        return;
      }
    }

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

  drow(car, x, y, w, h, loading, loadingX, loadingY, loadingW, loadingH, cookieImg) {
    this.ctx.drawImage(car, x, y, w, h)
    this.ctx.drawImage(loading, loadingX, loadingY, loadingW, loadingH)
    this.ctx.globalAlpha = .5;
    this.ctx.drawImage(cookieImg, loadingX, loadingY, loadingW, loadingH)
    this.ctx.globalAlpha = 1;
  }

  updateConfig({ spawnTime, types }) {
    this.spawnTime = spawnTime;
    this.types = types;
  }

}