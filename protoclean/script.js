import Joystick from "./modules/joystick.js";
import Map from "./modules/map.js";
import Hero from "./modules/hero.js";
import Cookies from "./modules/cookies.js";
import Cars from "./modules/cars.js";

class Game {
  constructor() {
    this.canvas = document.querySelector('.canvas');
    this.ctx = this.canvas.getContext('2d');

    this.time = 60000;
    this.pause = false;
    this.levels = [
      { level: 0,
        endTime: 50000, 
        cookie: { pieces: 3, types: 1, spawnTime: 3000, lifeTime: 10000 },
        car: { pieces: 3, types: 1, spawnTime: 3000, lifeTime: 10000 },
      },
      { level: 1,
        endTime: 40000, 
        cookie: { pieces: 4, types: 4, spawnTime: 2000, lifeTime: 5000 },
        car: { pieces: 4, types: 4, spawnTime: 3000, lifeTime: 10000 },
      },
      { level: 2,
        endTime: 0, 
        cookie: { pieces: 10, types: 5, spawnTime: 1000, lifeTime: 3000 },
        car: { pieces: 5, types: 5, spawnTime: 3000, lifeTime: 10000 },
      },
    ];
    this.level = null;    

    this.joystick = new Joystick();
    this.map = new Map(this.ctx);
    this.hero = new Hero(this.ctx);
    this.cookies = new Cookies(this.ctx, this.levels[0].cookie);
    this.cars = new Cars(this.ctx, this.levels[0].car);
  }

  init() {
    this.level = this.levels[0];
    this.updateConfigs();

    const gameTimer = setInterval(() => {
      this.time === 0 ? 0 : this.time -= 250;

      if (this.time === 0) {
        clearInterval(gameTimer);
        return console.log('gameover');
      };

      this.checkLevel();
      this.checkSpawn();

    }, 250)

    

    requestAnimationFrame(this.animate);
  }

  checkSpawn() {
    // Проверяем каждую печенькуи машинку на поле на время жизни.

    this.cookies.checkLife()
    this.cars.checkLife()

    // Проверяем по времени повторения респавна печеньки текущего уровня и количество печенек на поле,
    // если не хватает, то спавним новую печеньку

    if (this.time % this.cars.spawnTime === 0 && Object.keys(this.cars.cars).length < this.level.cookie.pieces) {
      this.cookies.spawnCookie();
    }

    // Проверяем по времени повторения респавна машинки текущего уровня и количество машинок на поле,
    // если не хватает, то спавним новую машинку

    if (this.time % this.cars.spawnTime === 0 && Object.keys(this.cars.cars).length < this.level.car.pieces) {
      this.cars.spawnCar();
    }
  }

  checkLevel() {
    if (this.time <= this.levels[this.level.level].endTime) {
      this.level = this.levels[this.level.level + 1];

      this.updateConfigs();
    };
  }

  updateConfigs() {
    this.cookies.updateConfig(this.level.cookie);
    this.cars.updateConfig(this.level.car);
  }

  animate = () => {
    let i, currentCookie;
    let cookies = this.cookies.cookies;
    let cars = this.cars.cars;
    let cookiesLength = Object.keys(cookies).length;
    let carsLength = Object.keys(cookies).length;

    // каждый кадр вычисляем положение персонажа
    if (this.joystick.active) {
      this.hero.moveCheched(this.joystick.impuls);
    }

    // Очищаем поле и рисуем карту каждый новый кадр
    this.ctx.clearRect(0, 0, 1000, 1000);
    this.map.drow();

    // Рисуем печеньки

    if (cookiesLength > 0) {

      for (i in cookies) {
        currentCookie = cookies[i];
        this.cookies.drow(currentCookie.bg, currentCookie.x, currentCookie.y, currentCookie.w, currentCookie.h);
      }
    }

    // Рисуем машинки

    if (carsLength > 0) {

      for (i in cars) {
        let currentCar = cars[i];
        this.cars.drow(currentCar.bg, currentCar.x, currentCar.y, currentCar.w, currentCar.h);
      }
    }

    // Рисуем персонажа
    this.hero.drow();

    if (this.pause) this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    requestAnimationFrame(this.animate);
  }
}

new Game().init();