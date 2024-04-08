import Cookie from "./cookie.js";

export default class GoldCookie extends Cookie {
  constructor() {
    super();
    this.type = 'gold';
    this.lifeTime = 6000;
    this.w = 35;
    this.h = 35;
    this.bg = document.querySelector(`#cookie-${this.type}`);
    this.init()
  }
}