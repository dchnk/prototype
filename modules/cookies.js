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

  spawnCookie(type, x, y, droped) {
    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }
    let randomType = Math.round(getRandomArbitrary(1, this.types));
    const cookie = new Cookie(x ? x : null, y ? y: null, type ? type : randomType, this.config.lifeTime, droped);
    
    this.cookies[cookie.id] = cookie;
  }

  checkLife() {
    let id, cookie;
    for (id in this.cookies) {

      cookie = this.cookies[id];
      if (cookie.lifeTime === 0) this.deleteCookie(id);
    }
  }

  deleteCookie(id) {
    if (!this.cookies[id]) return;

    delete this.cookies[id];
  }  

  drow(cookie) {
    if (cookie.droped) {
      this.ctx.globalAlpha = 0.3;
      this.ctx.drawImage(cookie.bg, cookie.x, cookie.y, cookie.w, cookie.h);
      this.ctx.globalAlpha = 1;
      return;
    }

    if (cookie.hidding) {
      this.ctx.globalAlpha = 1 / (3000 / cookie.lifeTime);
      this.ctx.drawImage(cookie.bg, cookie.x, cookie.y, cookie.w, cookie.h);
      this.ctx.globalAlpha = 1;
      return;
    }
    
    this.ctx.drawImage(cookie.bg, cookie.x, cookie.y, cookie.w, cookie.h);
  };

  updateConfig({spawnTime, types}) {
    this.spawnTime = spawnTime;
    this.types = types;
  };

}