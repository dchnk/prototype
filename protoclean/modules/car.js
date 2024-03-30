export default class Car {
  constructor(lifeTime = 15000) {
    this.id = null;
    this.w = null;
    this.h = null;
    this.x = null;
    this.y = null;
    this.type = null;
    this.lifeTime = lifeTime;
    this.spawnTime = Date.now();
    this.places = 0;
    this.bg = null;
    this.init();
  }

  spawn() {
    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    const side = Math.round(getRandomArbitrary(1, 4));
    let x, y, bg;

    switch (side) {
      // top
      case 1:
        x = Math.round(getRandomArbitrary(175, 785));
        y = 0;
        this.w = 300;
        this.h = 100;
        bg = document.querySelector('#car-top');
        break;

      // bottom
      case 2:
        x = Math.round(getRandomArbitrary(175, 785));
        y = 820;
        this.w = 100;
        this.h = 100;
        bg = document.querySelector('#car-bottom');
        break;

      // left
      case 3:
        x = 0;
        y = Math.round(getRandomArbitrary(175, 785));
        this.w = 300;
        this.h = 100;
        bg = document.querySelector('#car-side');
        break;

      // right
      case 4:
        x = 950
        y = Math.round(getRandomArbitrary(175, 785));
        this.w = 300;
        this.h = 100;
        bg = document.querySelector('#car-side');
        bg.style.transform = 'translate(-1, -1)'
        break;
    }

    return { x, y, bg };
  }

  init() {
    let currentSpawn = this.spawn();
    this.x = currentSpawn.x;
    this.y = currentSpawn.y;
    this.bg = currentSpawn.bg;
    this.id = this.x + this.y + this.spawnTime;
  }
}