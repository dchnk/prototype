

let canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

// document.addEventListener('mousemove', function (e) {

//   const stick = document.querySelector('.stick');
//   const stickPos = stick.getBoundingClientRect();
//   const joystick = document.querySelector('.joystick').getBoundingClientRect();

//   e.preventDefault();
//   if (!active) return;

//   currentMove.x = e.clientX - eventStart.x;
//   currentMove.y = e.clientY - eventStart.y;

//   let mag;
//   let ax = stickPos.x - joystick.x - 25;
//   let ay = stickPos.y - joystick.y - 25;


//   mag = Math.sqrt(ax * ax + ay * ay);


//   if (mag < 50) {
//     stick.style.top = 25 + currentMove.y + 'px';
//     stick.style.left = 25 + currentMove.x + 'px';
//   } else {
//     console.log(stick.style.top, stick.style.left)
//     console.log(mag)
//   }

//   cook.moveCheched({ x: currentMove.x / 100, y: currentMove.y / 100 })

// })

// stick.addEventListener('mousedown', (e) => {
//   console.log('Мышка нажата')
//   eventStart.x = e.clientX;
//   eventStart.y = e.clientY;
//   active = true;
// })

// document.addEventListener('mouseup', (e) => {
//   console.log('Мышка отпущена')
//   stick.style.top = '25px';
//   stick.style.left = '25px';
//   active = false;
// })


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

      // cook.moveCheched({ x: currentMove.x / 100, y: currentMove.y / 100 })

    })

    this.nodes.stick.addEventListener('mousedown', (e) => {
      console.log('Мышка нажата')

      this.start.x = e.clientX;
      this.start.y = e.clientY;
      this.active = true;

      console.log(this.active)
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


class Map {
  constructor(config) {
    this.x = 0;
    this.y = 0;
    this.w = 800;
    this.h = 800;
    this.bg = document.querySelector('#map');
  }

  drow() {
    ctx.drawImage(this.bg, this.x, this.y, this.w, this.h)
  }
}

class Cookie {
  constructor(config) {
    this.w = 30;
    this.h = 30;
    this.cookies = [];
    this.bg = document.querySelector('#cookie');
    this.init();
  }

  init() {

    let currentSpawn = this.spawn();
    this.cookies.push({ x: currentSpawn.x, y: currentSpawn.y, spawnTime: Date.now(), lifeTime: 5000 })



    setInterval(() => {
      let i, length = this.cookies.length, status;
      console.log(length)
      
      if (length === 0) return;
      
      for (i = 0; i < length; i++) {
        status = this.checkLife(this.cookies[i])

        switch (status) {
          case 1:
            break;

          case 0:
            this.cookies = this.cookies.splice(i, 1);
            break;

          default: break;
        }
      }
    }, 1000)

    setInterval(() => {
      if (this.cookies.length === 3) return;
      this.cookies.push({ x: currentSpawn.x, y: currentSpawn.y, spawnTime: Date.now(), lifeTime: 5000 })
    }, 5000)

  }

  spawn() {

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }


    const y = getRandomArbitrary(75, 662);
    const x = getRandomArbitrary(75, 685);

    return { x, y };
  }

  checkLife(item) {
    if (Date.now() - item.lifeTime < item.spawnTime) {
      return 1;
    }

    return 0;
  }

  drow(x = 100, y = 100) {
    ctx.drawImage(this.bg, x, y, this.w, this.h)
  }
}

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

    if (x < 70 || x > 690) {
      if (y < 70 || y > 667) {
        return;
      }

      this.y = y;
      return;
    }


    if (y < 70 || y > 667) {

      if (x < 70 || x > 690) {
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
const cookie = new Cookie();
const joystick = new Joystick();


let i, currentCookie;

const animate = () => {
  let length = cookie.cookies.length;

  setTimeout(() => {
    // каждый кадр вычисляем положение персонажа  
    if (joystick.active) {
      cook.moveCheched(joystick.impuls)
    }

    // Очищаем поле и рисуем карту каждый новый кадр
    ctx.clearRect(0, 0, 800, 800)
    map.drow();

    // Рисуем печеньки

    if (length > 0) {
      console.log(length)

      for (i = 0; i < length; i++) {
        currentCookie = cookie.cookies[i]
        cookie.drow(currentCookie.x, currentCookie.y)
      }
    }

    // Рисуем персонажа
    cook.drow();



    requestAnimationFrame(animate)

  }, 1000 / 144)


}

requestAnimationFrame(animate)