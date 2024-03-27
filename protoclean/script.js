

let canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

class Joystick {
  constructor() {
    this.nodes = {
      joystick: document.querySelector('.joystick'),
      stick: document.querySelector('.stick')
    };
    this.active = false;
    this.x = 0;
    this.y = 0;
    this.w = 100;
    this.h = 100;
    this.r = this.w / 2;


    this.stick = {
      cx: 25,
      cy: 25,
      x: 25,
      y: 25,
      w: 50,
      h: 50,
      r: 25,
    }

    this.start = { x: 0, y: 0 };
    this.m = { x: 0, y: 0 };
    this.impuls = {
      x: 0,
      y: 0,
    };

    this.init()
  }

  init() {

    this.nodes.stick.style.top = this.stick.y + 'px';
    this.nodes.stick.style.left = this.stick.x + 'px';

    document.addEventListener('mousemove', (e) => {
      if (!this.active) return;
      this.m.x = e.clientX - this.start.x;
      this.m.y = e.clientY - this.start.y;

      let mag = Math.sqrt(this.m.x * this.m.x + this.m.y * this.m.y);
      if (mag >= this.r) {

        this.stick.x = this.x + (this.m.x - this.x) / mag * this.r + this.stick.cx;
        this.stick.y = this.y + (this.m.y - this.y) / mag * this.r + this.stick.cy;

        this.impuls.x = (this.stick.cx - this.stick.x) * -1 / this.r;
        this.impuls.y = (this.stick.cy - this.stick.y) / this.r;


        this.nodes.stick.style.top = this.stick.y + 'px';
        this.nodes.stick.style.left = this.stick.x + 'px';
        return;
      }


      this.stick.x = this.stick.cx + this.m.x;
      this.stick.y = this.stick.cy + this.m.y;


      this.impuls.x = (this.stick.cx - this.stick.x) * -1 / this.r;
      this.impuls.y = (this.stick.cy - this.stick.y) / this.r;


      this.nodes.stick.style.top = this.stick.y + 'px';
      this.nodes.stick.style.left = this.stick.x + 'px';
    })

    this.nodes.stick.addEventListener('mousedown', (e) => {
      console.log('Мышка нажата')

      this.start.x = e.clientX;
      this.start.y = e.clientY;
      this.active = true;
    })

    document.addEventListener('mouseup', (e) => {
      console.log('Мышка отпущена')
      this.stick.x = 25;
      this.stick.y = 25;

      this.nodes.stick.style.top = this.stick.y + 'px';
      this.nodes.stick.style.left = this.stick.x + 'px';

      this.impuls.x = 0;
      this.impuls.y = 0;

      this.active = false;

      console.log(this.active)
    })

  }

}

class Game {
  constructor() {
    this.time = 180000;
    
  }
}

class Map {
  constructor(config) {
    this.x = -100;
    this.y = -100;
    this.w = 1200;
    this.h = 1200;
    this.bg = document.querySelector('#map');
  }

  drow() {
    ctx.drawImage(this.bg, this.x, this.y, this.w, this.h)
  }
}

class Cookie {
  constructor(lifeTime = 15000) {
    this.id = null;
    this.w = 30;
    this.h = 30;
    this.x = null;
    this.y = null;
    this.type = null;
    this.lifeTime = lifeTime;
    this.spawnTime = Date.now();
    this.bg = document.querySelector('#cookie');
    this.init();
  }

  init() {
    let currentSpawn = this.spawn();
    this.x = currentSpawn.x;
    this.y = currentSpawn.y;
    this.id = this.x + this.y + this.spawnTime;

    setTimeout(() => {
      if (!cookie.cookies[this.id]) return;

      delete cookie.cookies[this.id]
    }, this.lifeTime)
    
  }

  spawn() {
    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    const y = getRandomArbitrary(175, 762);
    const x = getRandomArbitrary(175, 785);

    return { x, y };
  }
}

class Cookies {

  constructor(types = 5) {
    this.cookies = {};
    this.types = types;
    this._init();
  }

  _init() {
    const cookie = new Cookie();
    this.cookies[cookie.id] = cookie;

    setInterval(() => {
      if (Object.keys(this.cookies).length === 3) return;

      const cookie = new Cookie();
      this.cookies[cookie.id] = cookie;
    }, 5000)

  }


  drow(bg, x, y, w, h) {
    ctx.drawImage(bg, x, y, w, h)
  }
}

const cookie = new Cookies();

class Hero {
  constructor(config) {
    this.x = 400;
    this.y = 400;
    this.w = 27.5;
    this.h = 60;
    this.bg = document.querySelector('#cook');
    this.speed = 2;
  }

  drow() {
    ctx.drawImage(this.bg, this.x, this.y, this.w, this.h)
  }

  moveCheched(impuls) {
    console.log(this.x, this.y)

    let x = this.x + impuls.x * this.speed;
    let y = this.y - impuls.y * this.speed;

    if (x < 170 || x > 790) {
      if (y < 170 || y > 767) {
        return;
      }

      this.y = y;
      return;
    }


    if (y < 170 || y > 767) {

      if (x < 170 || x > 790) {
        return;
      }

      this.x = x;
      return;
    }

    this.x = x;
    this.y = y;
  }
}

const map = new Map();
const cook = new Hero();
const joystick = new Joystick();

let i, currentCookie;

const animate = () => {


  let cookies = cookie.cookies;
  let length = Object.keys(cookies).length;

  setTimeout(() => {
    // каждый кадр вычисляем положение персонажа
    if (joystick.active) {
      cook.moveCheched(joystick.impuls)
    }

    // Очищаем поле и рисуем карту каждый новый кадр
    ctx.clearRect(0, 0, 1000, 1000)
    map.drow();

    // Рисуем печеньки

    if (length > 0) {

      for (i in cookies) {
        currentCookie = cookies[i]
        cookie.drow(currentCookie.bg, currentCookie.x, currentCookie.y, currentCookie.w, currentCookie.h)
      }
    }

    // Рисуем персонажа
    cook.drow();



    requestAnimationFrame(animate)

  }, 1000 / 144)


}

requestAnimationFrame(animate)