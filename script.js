import Joystick from "./modules/joystick.js";
import Map from "./modules/map.js";
import Hero from "./modules/hero.js";
import Cookies from "./modules/cookies.js";
import Cars from "./modules/cars.js";

class Game {
  constructor() {
    this.canvas = document.querySelector('.canvas');
    this.ctx = this.canvas.getContext('2d');

    this.time = 120000;
    this.timerNode = document.querySelector('.timer-num');
    this.pause = true;
    this.levels = [
      {
        level: 0,
        endTime: 0,
        cookie: { pieces: 30, types: 5, spawnTime: 1500, lifeTime: 10000 },
        car: { pieces: 12, types: 5, spawnTime: 3000, lifeTime: 20000 },
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
    this.scoreNode = document.querySelector('.score-num');
    this.joystick = new Joystick();
    this.map = new Map(this.ctx);
    this.hero = new Hero(this.ctx);
    this.cookies = new Cookies(this.ctx, this.levels[0].cookie);
    this.cars = new Cars(this.ctx, this.levels[0].car);
  }

  init() {
    this.level = this.levels[0];
    this.updateConfigs();

    this.canvas.addEventListener('mousedown', (evt) => {
      if (Object.keys(this.hero.cookiesRaised).length === 0) return;

      let x = evt.clientX;
      let y = evt.offsetY;

      if (x >= this.hero.x - 15 && x <= this.hero.x + this.hero.w + 20
        && y >= this.hero.y - 10 && y <= this.hero.y + this.hero.h + 10) {
        if (this.hero.leftHand) {
          this.cookies.spawnCookie(this.hero.leftHand.type, this.hero.x, this.hero.y + this.hero.h / 2, true);
          this.hero.deleteRaisedCookie(this.hero.leftHand.id);
          return;
        }

        if (this.hero.rightHand) {
          this.cookies.spawnCookie(this.hero.rightHand.type, this.hero.x, this.hero.y + this.hero.h / 2, true);
          this.hero.deleteRaisedCookie(this.hero.rightHand.id);
        }
      }
    })
    this.joystick.nodes.joystick.addEventListener('click', () => {
      if (!this.pause) this.pause = false;
    })

    document.querySelector('#start').addEventListener('click', () => {
      document.querySelector('.startMenu').classList.remove('popup_active');
      this.pause = false;
    })

    const gameTimer = setInterval(() => {
      if (this.pause) return;
      this.time <= 0 ? 0 : this.time -= 10;
      if (this.time % 1000 === 0) {
        this.timerNode.textContent = this.time / 1000;
      }

      if (this.time === 0) {
        clearInterval(gameTimer);
        return console.log('gameover');
      };

      if (this.time % 100 === 0) {
        let carID;
        for (carID in this.cars.cars) {
          this.cars.cars[carID].lifeTime -= 100;
        }

        let cookieID;
        for (cookieID in this.cookies.cookies) {
          let cookie = this.cookies.cookies[cookieID];

          if (cookie.droped) return;

          cookie.lifeTime -= 100;
        }

        this.checkLevel();
        this.checkSpawn();
      }

      // каждый кадр вычисляем положение персонажа
      if (this.joystick.active) {
        this.hero.moveCheched(this.joystick.impuls);
        this.checkGetCookie();
        this.checkPutCookie();
      }

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
      if (cookie.droped) return;
      if (this.hero.x >= cookie.x - cookie.w - 5 && this.hero.x <= cookie.x + cookie.w + 5) {
        if (this.hero.y >= cookie.y - 50 && this.hero.y <= cookie.y + cookie.h + 10) {
          this.hero.raiseCookie(cookie.id, cookie.type);
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
        if (this.hero.y >= car.loadingY - 50 && this.hero.y <= car.loadingY + car.loadingW + 10) {
          if (car.isStart || car.isEnd) return;
          let cookieID, cookie;
          for (cookieID in this.hero.cookiesRaised) {
            cookie = this.hero.cookiesRaised[cookieID];
            if (cookie.type == car.type && car.places !== car.maxPlaces) {
              car.incresePlaces();

              switch (cookie.type) {
                case 1: this.increseScore(1);
                  this.scoreNode.textContent = this.score;
                  break;

                case 2: this.increseScore(2);
                  this.scoreNode.textContent = this.score;
                  break;

                case 3: this.increseScore(3);
                  this.scoreNode.textContent = this.score;
                  break;

                case 4: this.increseScore(4);
                  this.scoreNode.textContent = this.score;
                  break;

                case 5: this.increseScore(5);
                  this.scoreNode.textContent = this.score;
                  break;

                default: break;
              }

              if (car.places === car.maxPlaces) {
                car.isEnd = true;
                this.cars.deleteCar(car.id);
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

  increseScore(num) {
    this.score += num;
  }

  animate = () => {
    let cookies = this.cookies.cookies;
    let cars = this.cars.cars;
    let cookiesLength = Object.keys(cookies).length;
    let carsLength = Object.keys(cars).length;

    // Очищаем поле и рисуем карту каждый новый кадр
    this.ctx.clearRect(0, 0, 1000, 1000);
    this.map.drow();

    if (this.pause) return requestAnimationFrame(this.animate);

    // Рисуем машинки

    if (carsLength > 0) {
      let carID;

      for (carID in cars) {
        let currentCar = cars[carID];
        if (currentCar.isStart || currentCar.isEnd) {
          this.cars.drowMoving(currentCar);
        } else {
          this.cars.drow(currentCar);
        }

      }
    }

    // Рисуем печеньки

    if (cookiesLength > 0) {
      let cookieID;

      for (cookieID in cookies) {
        let currentCookie = cookies[cookieID];
        this.cookies.drow(currentCookie);
      }
    }

    // Рисуем персонажа
    this.hero.drow();

    requestAnimationFrame(this.animate);
  }
}

new Game().init();