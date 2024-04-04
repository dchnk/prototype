export default class Car {
  constructor(type, lifeTime = 15000, side) {
    this.id = null;
    this.w = null;
    this.h = null;
    this.x = null;
    this.y = null;
    this.isStart = null;
    this.isEnd = null;
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
    this.cookieImg = document.querySelector(`#cookie${type}`)
    this.loading = null;
    this.loadingW = 70;
    this.loadingH = 70;
    this.loadingX = null;
    this.loadingY = null;
    this.init();
  }

  spawn() {
    this.isStart = true;

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    // const side = Math.round(getRandomArbitrary(1, 4));
    let x, y, bg;
    switch (this.side) {

      // top
      case 1:
        x = Math.round(getRandomArbitrary(160, 720));
        y = 40;
        this.w = 125;
        this.h = 125;

        this.firstX = x;
        this.firstY = y - 50;

        bg = document.querySelector('#car-top');
        this.loading = document.querySelector('#loading');
        this.loadingX = x + 28;
        this.loadingY = y + 130;
        break;

      // bottom
      case 2:
        x = Math.round(getRandomArbitrary(160, 720));
        y = 820;
        this.w = 150;
        this.h = 150;

        this.firstX = x;
        this.firstY = y + 50;

        bg = document.querySelector('#car-bottom');
        this.loading = document.querySelector('#loading');
        this.loadingX = x + 40;
        this.loadingY = y - 60;
        break;

      // left
      case 3:
        x = 10;
        y = Math.round(getRandomArbitrary(130, 720));
        this.w = 215;
        this.h = 107;

        this.firstX = x - 50;
        this.firstY = y;

        bg = document.querySelector('#car-left');
        this.loading = document.querySelector('#loading-vert');
        this.loadingX = x + 165;
        this.loadingY = y + 30;
        break;

      // right
      case 4:
        x = 780;
        y = Math.round(getRandomArbitrary(130, 720));
        this.w = 215;
        this.h = 107;

        this.firstX = x + 50;
        this.firstY = y;

        bg = document.querySelector('#car-right');
        this.loading = document.querySelector('#loading-vert');
        this.loadingX = x - 25;
        this.loadingY = y + 30;
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