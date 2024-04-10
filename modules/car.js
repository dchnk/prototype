export default class Car {
  constructor(type, lifeTime = 15000, side, canvas) {
    this.canvas = canvas;
    this.id = null;
    this.w = null;
    this.h = null;
    this.x = null;
    this.y = null;
    this.isStart = false;
    this.isEnd = false;
    this.firstX = null;
    this.firstY = null;
    this.type = type;
    this.side = side;
    this.lifeTime = lifeTime;
    this.spawnTime = Date.now();
    // this.maxPlaces = 0;
    // this.places = {};
    this.places = 0;
    this.maxPlaces = 4;
    this.bg = null;
    this.cookieImg = document.querySelector(`#cookie-${type}`)
    this.loading = null;
    this.loadingW = this.canvas.height * 0.07;
    this.loadingH = this.canvas.height * 0.07;
    this.loadingX = null;
    this.loadingY = null;
    this.init();
  }

  spawn() {
    this.isStart = true;

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    let x, y, bg;
    switch (this.side) {


      // top
      case 1:
        x = Math.round(getRandomArbitrary(this.canvas.height * 0.16, this.canvas.height * 0.72));
        y = Math.round(this.canvas.height * 0.04);
        this.w = this.canvas.height * 0.125;
        this.h = this.canvas.height * 0.125;

        this.firstX = x;
        this.firstY = y - Math.round(this.canvas.height * 0.05);

        bg = document.querySelector('#car-top');
        this.loading = document.querySelector('#loading');
        this.loadingX = x + this.canvas.height * 0.028;
        this.loadingY = y + this.canvas.height * 0.130;
        break;

      // bottom
      case 2:
        x = Math.round(getRandomArbitrary(this.canvas.height * 0.16, this.canvas.height * 0.72));
        y = Math.round(this.canvas.height * 0.82);
        this.w = this.canvas.height * 0.15;
        this.h = this.canvas.height * 0.15;

        this.firstX = x;
        this.firstY = y + Math.round(this.canvas.height * 0.05);

        bg = document.querySelector('#car-bottom');
        this.loading = document.querySelector('#loading');
        this.loadingX = x + this.canvas.height * 0.04;
        this.loadingY = y - this.canvas.height * 0.06;
        break;

      // left
      case 3:
        x = Math.round(this.canvas.height * 0.01);
        y = Math.round(getRandomArbitrary(this.canvas.height * 0.16, this.canvas.height * 0.72));
        this.w = this.canvas.height * 0.215;
        this.h = this.canvas.height * 0.107;

        this.firstX = x - Math.round(this.canvas.height * 0.05);
        this.firstY = y;

        bg = document.querySelector('#car-left');
        this.loading = document.querySelector('#loading-vert');
        this.loadingX = x + this.canvas.height * 0.165;
        this.loadingY = y + this.canvas.height * 0.03;
        break;

      // right
      case 4:
        x = Math.round(this.canvas.height * 0.78);
        y = Math.round(getRandomArbitrary(this.canvas.height * 0.13, this.canvas.height * 0.72));
        this.w = this.canvas.height * 0.215;
        this.h = this.canvas.height * 0.107;

        this.firstX = x + Math.round(this.canvas.height * 0.05);
        this.firstY = y;

        bg = document.querySelector('#car-right');
        this.loading = document.querySelector('#loading-vert');
        this.loadingX = x - this.canvas.height * 0.025;
        this.loadingY = y + this.canvas.height * 0.03;
        break;
    }

    return { x, y, bg };
  }

  move() {
    if (this.isStart) {
      switch (this.side) {
        case 1:
          this.firstY += 1;
          break;

        case 2:
          this.firstY -= 1;
          break;

        case 3:
          this.firstX += 1;
          break;

        case 4:
          this.firstX -= 1;
          break;

        default: break;
      }


      if (this.firstX === this.x && this.firstY === this.y) {
        this.isStart = false;
      }
    }

    if (this.isEnd) {
      switch (this.side) {
        case 1:
          this.y -= 1;
          break;

        case 2:
          this.y += 1;
          break;

        case 3:
          this.x -= 1;
          break;

        case 4:
          this.x += 1;
          break;

        default: break;
      }


      if (this.firstX === this.x && this.firstY === this.y) {
        this.isEnd = false;
      }
    }

  }

  init() {
    let currentSpawn = this.spawn();
    this.x = currentSpawn.x;
    this.y = currentSpawn.y;
    this.bg = currentSpawn.bg;
    this.id = this.x + this.y + this.spawnTime;
  }

  incresePlaces() {
    this.places = this.places + 1;
  }
}