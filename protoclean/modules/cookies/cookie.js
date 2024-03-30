export default class Cookie {
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

  spawn() {
    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }
    
    const y = Math.round(getRandomArbitrary(175, 762));
    const x = Math.round(getRandomArbitrary(175, 785));

    console.log(y, x)

    return { x, y };
  }

  init() {
    let currentSpawn = this.spawn();
    this.x = currentSpawn.x;
    this.y = currentSpawn.y;
    this.id = this.x + this.y + this.spawnTime;
  }
}