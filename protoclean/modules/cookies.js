import Cookie from "./cookies/cookie.js";

export default class Cookies {

  constructor(ctx, config) {
    this.ctx = ctx;
    this.config = config;
    this.cookies = {};
    this.types = 1;
    this.spawnTime = null;
    this._init();
  }

  _init() {
    this.spawnCookie();
  }

  spawnCookie(type) {
    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }
    let randomType = Math.round(getRandomArbitrary(1, this.types));
    const cookie = new Cookie(type ? type : randomType, this.config.lifeTime);
    
    this.cookies[cookie.id] = cookie;
  }

  checkLife() {
    let id, cookie;
    for (id in this.cookies) {

      cookie = this.cookies[id];
      if (Date.now() - cookie.spawnTime >= cookie.lifeTime) this.deleteCookie(id);
    }
  }

  deleteCookie(id) {
    if (!this.cookies[id]) return;

    delete this.cookies[id];
  }  

  drow(bg, x, y, w, h) {
    this.ctx.drawImage(bg, x, y, w, h);
  };

  updateConfig({spawnTime, types}) {
    this.spawnTime = spawnTime;
    this.types = types;
  };

}