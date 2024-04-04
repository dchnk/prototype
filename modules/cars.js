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


    if (!type) randomType = Math.round(getRandomArbitrary(1, this.types));

    let randomSide = Math.round(getRandomArbitrary(1, 4));

    let car = new Car(type ? type : randomType, this.config.lifeTime, randomSide);

    let id, item;
    for (id in this.cars) {
      item = this.cars[id]
      if (car.id === item.id) return;

      if (car.loadingX >= item.loadingX - item.loadingW - 10 && car.loadingX <= item.loadingX + item.loadingW + 10
        && car.loadingY >= item.loadingY - car.loadingH - 10 && car.loadingY <= item.loadingY + item.loadingY + 10) {
        this.spawnCar(randomType)
        return;
      }
    }

    this.cars[car.id] = car;
  }

  checkLifee() {
    let id, car;
    for (id in this.cars) {

      car = this.cars[id]
      if (Date.now() - car.spawnTime >= car.lifeTime) {
        car.isEnd = true;
        this.deleteCar(id)
      }
    }
  }

  checkLife() {
    let id, car;
    for (id in this.cars) {

      car = this.cars[id]
      if (car.lifeTime === 3000) {
        car.isEnd = true;
        this.deleteCar(id)
      }
    }
  }

  deleteCar(id) {
    if (!this.cars[id]) return;

    setTimeout(() => {
      delete this.cars[id];
    }, 3000)
  }

  drowMoving(car) {
    if (car.isStart) {
      car.move()
      this.ctx.drawImage(car.bg, car.firstX, car.firstY, car.w, car.h)
    }

    if (car.isEnd) {
      car.move()
      this.ctx.drawImage(car.bg, car.x, car.y, car.w, car.h)
    }
  }

  drow(car) {
    this.ctx.drawImage(car.bg, car.x, car.y, car.w, car.h)
    this.ctx.drawImage(car.loading, car.loadingX, car.loadingY, car.loadingW, car.loadingH)
    this.ctx.globalAlpha = .5;
    this.ctx.drawImage(car.cookieImg, car.loadingX, car.loadingY, car.loadingW, car.loadingH)
    this.ctx.globalAlpha = 1;
  }

  updateConfig({ spawnTime, types }) {
    this.spawnTime = spawnTime;
    this.types = types;
  }

}