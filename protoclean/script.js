
const canvas = document.querySelector('.canvas');

const ctx = canvas.getContext('2d');

const stick = document.querySelector('.stick')

const joystick = document.querySelector('.joystick').getBoundingClientRect();

let active = false;

document.addEventListener('mousemove', (e) => {
  if (!active) return;
  console.log(`Джостик: ${joystick.x}`)
  console.log(`Клиент: ${e.clientX}`)
})

stick.addEventListener('mousedown', (e) => {
  console.log('Мышка нажата')
  active = true;
})

document.addEventListener('mouseup', (e) => {
  console.log('Мышка отпущена')
  active = false;
})



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

class Hero {
  constructor(config) {
    this.x = 400;
    this.y = 400;
    this.w = 27.5;
    this.h = 60;
    this.bg = document.querySelector('#cook');
    this.speed = 3;
  }

  drow() {
    ctx.drawImage(this.bg, this.x, this.y, this.w, this.h)
  }

  move(x, y) {

    this.x += x * this.speed;
    this.y += y * this.speed;
  }
}

const map = new Map();
const cook = new Hero();

document.addEventListener('keydown', (e) => {
  switch (e.code) {
    case 'ArrowUp':
      cook.move(0, -.5)
    // break;

    case 'ArrowLeft':
      cook.move(-.5, 0)
      break;

    case 'ArrowRight':
      cook.move(.5, 0)
      break;

    case 'ArrowDown':
      cook.move(0, .5)
      break;

    default: break;
  }
})


setInterval(() => {


}, 1000 / 24)

const animate = () => {

  ctx.clearRect(0, 0, 800, 800)
  map.drow();
  cook.drow();
  requestAnimationFrame(animate)
}

requestAnimationFrame(animate)