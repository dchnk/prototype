export default class Cookie {
  constructor(canvas, x = null, y = null, type, lifeTime, droped = null) {
    this.canvas = canvas;
    this.id = null;
    this.droped = droped;
    this.hidding = false;
    this.w = this.canvas.height * 0.03;
    this.h = this.canvas.height * 0.03;
    this.x = x;
    this.y = y;
    this.type = type;
    this.lifeTime = lifeTime;
    this.spawnTime = Date.now();
    this.bg = document.querySelector(`#cookie-${this.type}`);
    this.init();
  }

  spawn() {
    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    if (this.x && this.y) {
      const y = this.y;
      const x = Math.round(getRandomArbitrary(this.x - this.canvas.height * 0.01, this.x + this.canvas.height * 0.005));
      return { x, y };
    }
    const y = Math.round(getRandomArbitrary(this.canvas.height * 0.175, this.canvas.height * 0.762));
    const x = Math.round(getRandomArbitrary(this.canvas.height * 0.175, this.canvas.height * 0.785));

    return { x, y };
  }

  init() {
    let currentSpawn = this.spawn();
    this.x = currentSpawn.x;
    this.y = currentSpawn.y;
    this.id = this.x + this.y + this.spawnTime;

    setTimeout(() => {
      this.hidding = true;
    }, this.lifeTime - 3000)

    if (this.droped) {
      setTimeout(() => {
        this.droped = false;
      }, 5000)
    }
  }
}