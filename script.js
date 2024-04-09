import Joystick from "./modules/joystick.js";
import Map from "./modules/map.js";
import Hero from "./modules/hero.js";
import Cookies from "./modules/cookies.js";
import Cars from "./modules/cars.js";

document.querySelector('#restart').addEventListener('click', () => {
  location.reload()
})

class Game {
  constructor() {
    this.canvas = document.querySelector('.canvas');
    this.ctx = this.canvas.getContext('2d');
    this.time = 120000;
    this.timerNode = document.querySelector('.timer-num');
    this.gameoverMenu = document.querySelector('.endMenu');
    this.gameoverScore = document.querySelector('.gameover_score-num');
    this.pause = true;
    this.levels = [
      {
        level: 0,
        endTime: 0,
        cookie: {
          pieces: 10, types: 5, spawnTime: 1500, lifeTime: 20000, chance: {
            1: 0.8,
            2: 0.6,
            1: 0.4,
            2: 0.2,
            1: 0.1,
          }
        },
        car: {
          pieces: 6, types: 5, spawnTime: 3000, lifeTime: 20000, chance: {
            1: 0.8,
            2: 0.6,
            1: 0.4,
            2: 0.2,
            1: 0.1,
          }
        },
      },
      // {
      //   level: 1,
      //   endTime: 60000,
      //   cookie: { pieces: 12, types: 3, spawnTime: 1500, lifeTime: 15000 },
      //   car: { pieces: 6, types: 3, spawnTime: 3000, lifeTime: 15000 },
      // },
      // {
      //   level: 2,
      //   endTime: 0,
      //   cookie: { pieces: 24, types: 5, spawnTime: 1500, lifeTime: 8000 },
      //   car: { pieces: 12, types: 5, spawnTime: 2500, lifeTime: 10000 },
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
    this.interfaceNodes = {
      slot1: document.querySelector('.slot-1'),
      slot2: document.querySelector('.slot-2'),
    }
  }

  init() {
    this.level = this.levels[0];
    this.updateConfigs();

    this.interfaceNodes.slot1.addEventListener('click', () => {
      if (this.hero.boosters?.gold) {
        this.hero.deleteRaisedCookie();
        return;
      }

      if (!this.hero.leftHand.type) return;

      this.cookies.spawnCookie(this.hero.leftHand.type, this.hero.x, this.hero.y + this.hero.h / 2, true);
      this.hero.deleteRaisedCookie(this.hero.leftHand.id);
    })

    this.interfaceNodes.slot2.addEventListener('click', () => {
      if (this.hero.boosters?.gold) {
        this.hero.deleteRaisedCookie();
        return;
      }

      if (!this.hero.rightHand.type) return;

      this.cookies.spawnCookie(this.hero.rightHand.type, this.hero.x, this.hero.y + this.hero.h / 2, true);
      this.hero.deleteRaisedCookie(this.hero.rightHand.id);
    })

    document.addEventListener('keydown', (e) => {
      if (Object.keys(this.hero.cookiesRaised).length === 0) return;

      if (e.code === 'Space') {
        this.handleDropCookie();
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

      if (this.time === 60000) {
        this.cookies.spawnCookie('gold');
      }

      if (this.time === 0) {
        clearInterval(gameTimer);
        this.gameoverScore.textContent = this.score;
        this.gameoverMenu.classList.add('popup_active');
        return console.log('gameover');
      };

      // каждый кадр вычисляем положение персонажа
      if (this.joystick.active) {
        this.hero.moveCheched(this.joystick.impuls);
      }

     

      if (this.time % 100 === 0) {
        this.checkLevel();
        this.checkSpawn();
        this.checkGetCookie();
        this.checkPutCookie();
        
        if (!this.joystick.active) {
          this.hero.checkPosition();
        }

        if (this.joystick.active) {
          this.hero.checkPosition(this.joystick.impuls);
        }

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

      }



    }, 10)

    requestAnimationFrame(this.animate);
  }

  handleDropCookie() {
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
      let level;
      for (level in this.cookies.levels) {
        
        if (!this.cookies.levels[level]) continue;

        if (!this.cars.levels[level]) {          

          if (Math.random > 0.2) continue;

          return this.cars.spawnCar(level);
        }
      }

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
    if (this.hero.boosters?.gold) return;

    if (Object.keys(this.hero.cookiesRaised).length === this.hero.maxCookies) return;

    let i;
    for (i in this.cookies.cookies) {
      if (Object.keys(this.hero.cookiesRaised).length === this.hero.maxCookies) return;
      let cookie = this.cookies.cookies[i];
      if (cookie.droped) return;

      if (this.hero.x >= cookie.x - this.hero.w - 5 && this.hero.x <= cookie.x + cookie.w + 5) {
        if (this.hero.y >= cookie.y - this.hero.h + 5 && this.hero.y <= cookie.y + cookie.h + 10) {
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

          if (this.hero.boosters?.gold) {
            this.increseScore(15);
            this.scoreNode.textContent = this.score;


            car.isEnd = true;
            this.cars.deleteCar(car.id);
            this.hero.deleteRaisedCookie();
            return;
          }

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
    // this.ctx.font = "48px serif";
    // this.ctx.fillStyle = "#FFF";
    // this.ctx.fillText(`Уровни печенек: ${JSON.stringify(this.cookies.levels)}`, 100, 900)

    requestAnimationFrame(this.animate);
  }
}

new Game().init();