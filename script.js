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
      {
        level: 0,
        endTime: 0,
        cookie: { pieces: 10, types: 2, spawnTime: 3000, lifeTime: 60000 },
        car: { pieces: 5, types: 2, spawnTime: 10000, lifeTime: 60000 },
      },
      // {
      //   level: 1,
      //   endTime: 40000,
      //   cookie: { pieces: 4, types: 1, spawnTime: 2000, lifeTime: 5000 },
      //   car: { pieces: 1, types: 1, spawnTime: 3000, lifeTime: 10000 },
      // },
      // {
      //   level: 2,
      //   endTime: 0,
      //   cookie: { pieces: 10, types: 1, spawnTime: 1000, lifeTime: 3000 },
      //   car: { pieces: 3, types: 1, spawnTime: 3000, lifeTime: 10000 },
      // },
    ];
    this.level = null;
    this.score = 0;
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
      this.time <= 0 ? 0 : this.time -= 10;

      // каждый кадр вычисляем положение персонажа
      if (this.joystick.active) {
        this.hero.moveCheched(this.joystick.impuls);
        this.checkGetCookie();
        this.checkPutCookie();
      }

      if (this.time === 0) {
        clearInterval(gameTimer);
        return console.log('gameover');
      };

      this.checkLevel();
      this.checkSpawn();

    }, 10)



    requestAnimationFrame(this.animate);
  }

  checkSpawn() {
    // Проверяем каждую печенькуи машинку на поле на время жизни.

    this.cookies.checkLife();
    this.cars.checkLife();


    // Проверяем по времени повторения респавна печеньки текущего уровня и количество печенек на поле,
    // если не хватает, то спавним новую печеньку
    if (this.time % this.cookies.spawnTime === 0 && Object.keys(this.cookies.cookies).length < this.level.cookie.pieces) {
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

  checkGetCookie() {
    if (Object.keys(this.hero.cookiesRaised).length === this.hero.maxCookies) return;

    let i;
    for (i in this.cookies.cookies) {
      let cookie = this.cookies.cookies[i];
      if (this.hero.x >= cookie.x - cookie.w - 5 && this.hero.x <= cookie.x + cookie.w + 5) {
        if (this.hero.y >= cookie.y - 50 && this.hero.y <= cookie.y + cookie.h + 10) {
          this.hero.raiseCookie(cookie.id, cookie.type);
          console.log(this.hero.cookiesRaised);
          this.cookies.deleteCookie(cookie.id);
        }
      }
    }
  }
  
  checkPutCookie() {
    let carID, car;
    for (carID in this.cars.cars) {
      car = this.cars.cars[carID];
      if (this.hero.x >= car.loadingX - this.hero.w - 5 && this.hero.x <= car.loadingX + car.loadingW + 5) {
        if (this.hero.y >= car.loadingY - 50 && this.hero.y <= car.loadingY  + car.loadingW + 10) {
        
          let cookieID, cookie;
          for (cookieID in this.hero.cookiesRaised) {
            cookie = this.hero.cookiesRaised[cookieID];
            if (cookie.type == car.type) {
              car.incresePlaces();
              
              switch(cookie.type) {
                case 1: this.increseSroce(1);
                console.log(`Ваш счет ${this.score}`)
                break;
                
                case 2: this.increseSroce(2);
                console.log(`Ваш счет ${this.score}`)
                break;
                
                default: break;
              }
              
              if (car.places === 2) {
                delete this.cars.cars[carID];
              }
              this.hero.deleteRaisedCookie(cookieID)
            }
          }
          // this.hero.raiseCookie(cookie.id, cookie.type);
          // console.log(this.hero.cookiesRaised);
          // this.cookies.deleteCookie(cookie.id);
        }
      }
    }
  }
 
  updateConfigs() {
    this.cookies.updateConfig(this.level.cookie);
    this.cars.updateConfig(this.level.car);
  }
  
  increseSroce(num) {
    this.score = this.score + num;
  }

  animate = () => {
    let cookies = this.cookies.cookies;
    let cars = this.cars.cars;
    let cookiesLength = Object.keys(cookies).length;
    let carsLength = Object.keys(cars).length;

    // Очищаем поле и рисуем карту каждый новый кадр
    this.ctx.clearRect(0, 0, 1000, 1000);
    this.map.drow();

    // Рисуем машинки

    if (carsLength > 0) {
      let carID;

      for (carID in cars) {
        let currentCar = cars[carID];
        this.cars.drow(currentCar.bg, currentCar.x, currentCar.y, currentCar.w, currentCar.h, currentCar.loading, currentCar.loadingX, currentCar.loadingY, currentCar.loadingW, currentCar.loadingH, currentCar.cookieImg);
      }
    }

    // Рисуем печеньки

    if (cookiesLength > 0) {
      let cookieID;

      for (cookieID in cookies) {
        let currentCookie = cookies[cookieID];
        this.cookies.drow(currentCookie.bg, currentCookie.x, currentCookie.y, currentCookie.w, currentCookie.h);
      }
    }



    // Рисуем персонажа
    this.hero.drow();

    if (this.pause) this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    requestAnimationFrame(this.animate);
  }
}

new Game().init();