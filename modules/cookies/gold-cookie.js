import Cookie from "./cookie.js";

export default class GoldCookie extends Cookie {
  constructor(canvas) {
    super(canvas);
    this.type = 'gold';
    this.lifeTime = 6000;
    this.w = this.canvas.height * 0.05;
    this.h = this.canvas.height * 0.05;
    this.bg = document.querySelector(`#cookie-${this.type}`);
    this.init()
  }
}