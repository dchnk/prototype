export default class Cookie {
  constructor(x = null, y = null, type, lifeTime, droped = null) {
    this.id = null;
    this.droped = droped;
    this.hidding = false;
    this.w = 30;
    this.h = 30;
    this.x = x;
    this.y = y;
    this.type = type;
    this.lifeTime = lifeTime;
    this.spawnTime = Date.now();
    this.bg = document.querySelector(`#cookie${this.type}`);
    this.init();
  }

  spawn() {
    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    if (this.x && this.y) {
      const y = this.y;
      const x = Math.round(getRandomArbitrary(this.x - 10, this.x + 5));
      return { x, y };
    }
    const y = Math.round(getRandomArbitrary(175, 762));
    const x = Math.round(getRandomArbitrary(175, 785));

    return { x, y };
  }

  init() {
    if (this.droped) {
      setTimeout(() => {
        this.droped = false;
      }, 5000)
    }

    setTimeout(() => {
      this.hidding = true;
    }, this.lifeTime - 3000)

    let currentSpawn = this.spawn();
    this.x = currentSpawn.x;
    this.y = currentSpawn.y;
    this.id = this.x + this.y + this.spawnTime;
  }
}