import Joystick from "./modules/joystick.js";
import Map from "./modules/map.js";
import Hero from "./modules/hero.js";
import Cookies from "./modules/cookies.js";

class Game {
  constructor() {
    this.canvas = document.querySelector('.canvas');
    this.ctx = this.canvas.getContext('2d');

    this.time = 30000;
    this.pause = false;
    this.levels = [
      {level: 1, endTime: 20000, coockie: {pieces: 3, types: 5}},
      {level: 2, endTime: 10000, coockie: {pieces: 4, types: 5}},
      {level: 3, endTime: 0, coockie: {pieces: 5, types: 5}},
    ];
    this.level = null;
    this.joystick = new Joystick();
    this.map = new Map(this.ctx);
    this.hero = new Hero(this.ctx);
    this.cookies = new Cookies(5, this.ctx);
  }

  init() {
    this.level = this.levels[0];

    setInterval(() => {

      this.time === 0 ? 0 : this.time -= 250;

      if (this.time === 0) return;

      this.checkLevel();
      if (this.time % this.cookies.spawnTime === 0 && Object.keys(this.cookies.cookies).length < this.level.coockie.pieces) {
        
        // let type = Math.random() * this.level.cookie.types;
        this.cookies.spawnCookie();
      }
      

    }, 250)

    requestAnimationFrame(this.animate);
  }

  checkLevel() {
    
    if (this.time <= this.levels[this.level.level - 1].endTime ) {
      this.level = this.levels[this.level.level];
    }

    console.log(this.level)
  }

  animate = () => {
    let i, currentCookie;
    let cookies = this.cookies.cookies;
    let length = Object.keys(cookies).length;

    // каждый кадр вычисляем положение персонажа
    if (this.joystick.active) {
      this.hero.moveCheched(this.joystick.impuls)
    }

    // Очищаем поле и рисуем карту каждый новый кадр
    this.ctx.clearRect(0, 0, 1000, 1000)
    this.map.drow();

    // Рисуем печеньки

    if (length > 0) {

      for (i in cookies) {
        currentCookie = cookies[i]
        this.cookies.drow(currentCookie.bg, currentCookie.x, currentCookie.y, currentCookie.w, currentCookie.h)
      }
    }

    // Рисуем персонажа
    this.hero.drow();

    requestAnimationFrame(this.animate)
  }
}

new Game().init();