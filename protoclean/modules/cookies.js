import Cookie from "./cookies/cookie.js";

export default class Cookies {

  constructor(types = 5, ctx) {
    this.ctx = ctx;
    this.cookies = {};
    this.types = types;
    this.spawnTime = 5000;
    this._init();
  }

  _init() {
    this.spawnCookie();

    // setInterval(() => {
    //   if (Object.keys(this.cookies).length === 3) return;

    //   const cookie = new Cookie();
    //   this.cookies[cookie.id] = cookie;
    // }, 5000)

  }

  spawnCookie() {
    const cookie = new Cookie();
    this.cookies[cookie.id] = cookie;
  }

  deleteCookie(id) {
    if (!this.cookies[id]) return;

    delete this.cookies[id]
  }

  drow(bg, x, y, w, h) {
    this.ctx.drawImage(bg, x, y, w, h)
  }

}